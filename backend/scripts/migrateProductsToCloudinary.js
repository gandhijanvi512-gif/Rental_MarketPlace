import "dotenv/config";

import mongoose from "mongoose";
import fs from "fs";
import path from "path";

import cloudinary from "../config/cloudinary.js";
import Product from "../model/productmodel.js";

const migrateProducts = async () => {
    try {
        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.DB_URL);

        console.log("MongoDB connected.");

        const products = await Product.find({});

        console.log(
    JSON.stringify(products, null, 2)
);

        console.log(`Found ${products.length} products.`);

        let updated = 0;
        let skipped = 0;
        let failed = 0;

        for (const product of products) {
            console.log("\n--------------------------------");
            console.log("Product:", product.title);
            console.log("ID:", product._id);

            if (!product.images || product.images.length === 0) {
                console.log("No images found.");
                skipped++;
                continue;
            }

            const newImages = [];

            for (const image of product.images) {

                // -----------------------------
                // Already Cloudinary
                // -----------------------------

                if (
                    image.startsWith("https://res.cloudinary.com") ||
                    image.startsWith("http://res.cloudinary.com")
                ) {
                    console.log("Already Cloudinary:");
                    console.log(image);

                    newImages.push(image);

                    continue;
                }

                // -----------------------------
                // Get filename
                // -----------------------------

                const filename = path.basename(image);

                const localPath = path.join(
                    __dirname,
                    "..",
                    "uploads",
                    "products",
                    filename
                );

                console.log("Local file:");
                console.log(localPath);

                // -----------------------------
                // Check file
                // -----------------------------

                if (!fs.existsSync(localPath)) {
                    console.log("❌ File not found");

                    // Keep old path
                    newImages.push(image);

                    failed++;

                    continue;
                }

                try {

                    // -----------------------------
                    // Upload Cloudinary
                    // -----------------------------

                    console.log("Uploading:", filename);

                    const result = await cloudinary.uploader.upload(
                        localPath,
                        {
                            folder: "rental-marketplace/products",
                            resource_type: "image",
                        }
                    );

                    console.log("✅ Uploaded:");
                    console.log(result.secure_url);

                    newImages.push(result.secure_url);

                } catch (error) {

                    console.log(
                        "❌ Cloudinary upload failed:",
                        error.message
                    );

                    // Keep old image
                    newImages.push(image);

                    failed++;
                }
            }

            // -----------------------------
            // Update MongoDB
            // -----------------------------

            const changed =
                JSON.stringify(product.images) !==
                JSON.stringify(newImages);

            if (changed) {

                product.images = newImages;

                await product.save();

                console.log("✅ MongoDB updated");

                updated++;

            } else {

                console.log("No changes.");

                skipped++;
            }
        }

        console.log("\n=================================");
        console.log("MIGRATION FINISHED");
        console.log("=================================");

        console.log("Total products :", products.length);
        console.log("Updated        :", updated);
        console.log("Skipped        :", skipped);
        console.log("Failed         :", failed);

        console.log("=================================");

        await mongoose.connection.close();

        process.exit(0);

    } catch (error) {

        console.error("Migration error:", error);

        await mongoose.connection.close();

        process.exit(1);
    }
};

migrateProducts();