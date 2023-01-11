import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/photo";
import { Toxiproxy, Latency } from "toxiproxy-node-client";
import { run } from "./run";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3307,
  username: "root",
  password: "test",
  database: "test",
  entities: [Photo],
  synchronize: true,
  dropSchema: true,
  cache: true,
  logging: false,
});

const toxiproxy = new Toxiproxy("http://localhost:8474");

const proxy = await toxiproxy.get("mysql");

await proxy.addToxic<Latency>({
  name: "latency",
  stream: "downstream",
  type: "latency",
  toxicity: 1,
  attributes: { latency: 1000, jitter: 0 },
});

console.log("added latency toxic");

AppDataSource.initialize();
run();

// To fix the race, await the result of initialize:
// AppDataSource.initialize()
//   .then(() => {
//     console.log("data source initalized");
//     run();
//   })
//   .catch((error) => console.log(error));
