const asciichart = require("asciichart");
const ora = require("ora");
const chalk = require("chalk");
const fetch = require("node-fetch");
const { IEXCloudClient } = require("node-iex-cloud");
const { history } = require("yahoo-stocks"); //Special Thanks to: Fabian Beuke aka Madnight (https://github.com/madnight)
const { interpolateArray } = require("array-interpolatejs");
const { toHumanString } = require("human-readable-numbers");
const { identity, defaultTo, pipe } = require("lodash/fp");
const { tail, flatMap } = require("lodash/fp");
const { compact, map } = require("lodash/fp");

module.exports = args => {
  let symbol = args.symbol || args.s;

  const throbber = ora().start();
  const width = defaultTo(14);
  const height = defaultTo(80);
  const range = defaultTo("5y");
  const humanString = i => (i ? toHumanString(i).replace("G", "B") : null);

  const iex = new IEXCloudClient(fetch, {
    publishable: "pk_187d0f71ac59455cae69bac7e3e081e0"
  });

  const errorHandler = () => {
    console.log(chalk.red("Error. Could not find symbol: " + symbol));
    process.exit(1);
  };

  const getHist = async () => {
    return await history(symbol.toUpperCase(), {
      interval: "1m",
      range: range
    }).catch(errorHandler);
  };

  const getQuote = async i => {
    return await iex
      .symbols(i)
      .batch("quote")
      .catch(errorHandler);
  };

  const chart = async () => {
    try {
      const [hist, qt] = await Promise.all([getHist(), getQuote(symbol)]);
      const chart = pipe(
        map(identity),
        tail,
        flatMap(map("close")),
        interpolateArray(width),
        compact,
        x => asciichart.plot(x, { height: height })
      )(hist);
      console.log(hist);
      const q = map("quote")(qt)[0];
      console.log(q);
      console.log(chart);
      console.log(q.companyName)
      console.log(
        " ".repeat(15) +
          (q.companyName +
            " " +
            " chart. Latest Price: $" +
            q.latestPrice +
            " | MktCap: " +
            humanString(q.marketCap))
      );
    } catch (error) {
      console.error(error);
    }
  };

  chart();

  throbber.succeed(`${chalk.green("All Done")}`);
};
