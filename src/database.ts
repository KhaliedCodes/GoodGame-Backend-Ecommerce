import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  TEST_USER,
  TEST_PASSWORD,
  PORT,
  ENV,
} = process.env;

const client = mongoose



export default client;
