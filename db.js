import pkg from "pg";
import "dotenv/config";

const { Client } = pkg;

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log(error);
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
