import { runSeeders, setDataSource, SeederOptions } from "typeorm-extension";
import { AppDataSource } from "../app-datasource";
import createRoleSeeder from "./create-role.seed";


async function seedDatabase() {
    await AppDataSource.initialize();
    await setDataSource(AppDataSource); // Ensure seeding is registered
    console.log("Running specific seeders...");

    const options: SeederOptions = {
        seeds: [createRoleSeeder], // Run only the specified seeders
    };

    await runSeeders(AppDataSource, options);
    
    console.log("Seeding completed.");
    await AppDataSource.destroy();
}

seedDatabase().catch((err) => {
    console.error("Error running seeders:", err);
});
