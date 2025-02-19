import client from "../database/db.js";  // Importing the database client
import generateToken from "../utils/generateToken.js";

const addUser = async (req, res) => {
  try {
    // Set the search path to the 'public' schema
    await client.query("SET search_path TO 'public'");

    // Destructure the user data from the request body
    const { username, email, password } = req.body;
    console.log(req.body);

    // Validate that the passwords match
  

    // Check if email already exists
    const existingUser = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert the user with a hashed password into the database
    const result = await client.query(
      `INSERT INTO users (username, email, password) 
      VALUES ($1, $2,$3) RETURNING *`,
      [username, email, password]
    );

    // Send a success response with the inserted user
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],  // Return the inserted user
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  try {
    // Set the search path to the 'public' schema
    await client.query("SET search_path TO 'public'");

    // Destructure the user data from the request body
    const { email, password } = req.body;
    console.log(req.body);
    // Check if email exists
    const existingUser = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    console.log(existingUser.rows);
    if (existingUser.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if the password is correct
    const user = existingUser.rows[0];
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    let token = generateToken(user.id);
    // Send a success response with the user
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Failed to login user" });
  }
}

const getUserInfo = async (req, res) => {
  try {
    // Set the search path to the 'public' schema
    await client.query("SET search_path TO 'public'");

    // Get the user ID from the request object
    const userId = req.user.id;

    // Get the user from the database
    const result = await client.query(
      `SELECT * FROM users WHERE id = $1`,
      [userId]
    );
    console.log(result.rows);

    // Send a success response with the user
    res.status(200).json({
      message: "User found",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
}

const updateUser = async (req, res) => {
  try {
    // Set the search path to the 'public' schema
    await client.query("SET search_path TO 'public'");

    // Get the user ID from the request object
    const userId = req.user.id;

    // Destructure the user data from the request body
    const { username } = req.body;

    // Update the user in the database
    const result = await client.query(
      `UPDATE users SET username = $1  WHERE id = $2 RETURNING *`,
      [username, userId]
    );

    // Send a success response with the updated user
    res.status(200).json({
      message: "User updated",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
}

export { addUser, loginUser, getUserInfo,updateUser };
