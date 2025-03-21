import { confirm, checkbox, Separator } from "@inquirer/prompts";
import figlet from "figlet";
import gradient from "gradient-string";
import ns from "nanospinner";
import chalk from "chalk";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const title = "Hack Ramadhan 2025";
  figlet(title, { width: 80 }, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
  await sleep(200);
}

async function cheatMenu() {
  await checkbox({
    message: "Pilih cheat yang mau diaktifkan\n",
    choices: [
      { name: "Anti Lapar" },
      { name: "Anti Lemes" },
      { name: "Anti Nafsu" },
      { name: "Auto Buka" },
      { name: "Auto Sahur" },
      { name: "Auto Khatam" },
      { name: "Unlimited Pahala" },
    ],
  });

  const RUsure = await confirm({
    message: "yakin?",
  });
  if (RUsure === false) {
    console.clear();
    cheatMenu();
  }
}

async function generateCheatCode() {
  const loading = ns.createSpinner("Mencari Celah dunia terbaru").start();
  await sleep(9000);
  loading.start("Menemukan celah dunia");
  await sleep(7000);
  loading.start("Membuat Kode exploit");
  await sleep(3000);
  loading.success("Kode Cheat: " + chalk.red.bold("Tidur"));
}
await welcome();
await cheatMenu();
await generateCheatCode();
