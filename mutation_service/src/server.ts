import "reflect-metadata";
import kafka from "./kafka";

const startServer = async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log({
        value: message?.value?.toString(),
      });
    },
  });
};

startServer();
