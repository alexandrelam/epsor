import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "mutation-service",
  brokers: ["kafka:9092"],
});

export default kafka;
