import pkg from "pg";
import "dotenv/config";

const { Client } = pkg;

async function query(queryString, params) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryString, params);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
