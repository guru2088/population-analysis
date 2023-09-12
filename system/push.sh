#!/bin/bash

declare -r Region=ap-south-1
declare -r Repo=api
declare -r Tag=latest
declare -r BuildPath="./build-images/${Repo}" 

out=$(aws ecr describe-repositories --repository-names ${Repo} 2>/dev/null)
Status=$?
if [ $Status -gt 0 ]; then
   out=$(aws ecr create-repository --repository-name ${Repo}) 
   RepoURI=$(echo $out | jq -r '.repository.repositoryUri')
   aws ecr put-lifecycle-policy --repository-name ${Repo} \
       --lifecycle-policy-text file://./ecr-lifecycle-policy.json
else
   RepoURI=$(echo $out | jq -r '.repositories[0].repositoryUri')
fi

echo $RepoURI

if [ -z $RepoURI ]; then
   echo "Error for ${Repo}"
   exit 1
fi

Registry=$(echo $RepoURI | sed "s/\/$Repo//")
echo $Registry

aws ecr get-login-password | docker login --username AWS --password-stdin $Registry
Status=$?
if [ $Status -gt 0 ]; then
   echo "ecr login failed"
   exit 1;
fi

cd $BuildPath

docker build --no-cache -t ${Repo}:${Tag} . 
Status=$?
if [ $Status -gt 0 ]; then
   echo "Build failed for ${Repo}"
   exit 1;
fi

docker tag $Repo:$Tag ${RepoURI}:${Tag}
docker push ${RepoURI}:${Tag}
Status=$?
if [ $Status -gt 0 ]; then
   echo "image push failed for ${Repo}"
   exit 1;
fi

exit 0;
