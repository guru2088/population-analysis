echo "*********started deployement for admin back end*********"
echo "#########git pull#########"
git fetch --all && git checkout "main" && git pull
echo "#########build and push image#########"
./system/prod/push.sh
echo "#########apply builded image#########"
./system/prod/apply.sh
echo "*********completed deployement for admin back end*********"