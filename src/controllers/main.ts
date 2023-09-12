import { Request, Response } from "express";
import { TDebug } from "../log";
import { Swagger20Request } from "swagger-tools";
import * as HttpStatus from "http-status-codes";

const debug = new TDebug("app:src:controllers:main");

export async function getStates(
  req: Request & Swagger20Request,
  res: Response
): Promise<any> {
  res.send({ msg: ["Assam", "Delhi"] });
}

export async function getPeoples(
  req: Request & Swagger20Request,
  res: Response
): Promise<any> {
  res.send({ msg: ["Guru", "Rajan"] });
}

export async function getWelcome(
  req: Request & Swagger20Request,
  res: Response
): Promise<any> {
  res.sendStatus(HttpStatus.OK);
}
