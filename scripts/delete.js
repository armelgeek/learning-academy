import { PrismaClient } from '@prisma/client';
const database = new PrismaClient();

async function main() {
    try {
        await database.comments.delete({
            where : {
                content : null
            }
        })


    } catch (error){
        console.log("Error deleting comments from database : " + error.message);
    } finally {
        await database.$disconnect();
    }
}

main();
