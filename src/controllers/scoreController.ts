import sql from "better-sqlite3";
import { Request, Response } from "express";
import { User } from "../models/user.js";

const db = sql("mathgame.db");