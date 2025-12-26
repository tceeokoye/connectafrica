import bcrypt from "bcrypt";

async function generateHash() {
  try {
    const password = "Cajetan2626"; 
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log("Hashed password:", hash);
    console.log("Use this hash in your admin document as passwordHash.");
  } catch (err) {
    console.error("Error generating hash:", err);
  }
}

generateHash();
