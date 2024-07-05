import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";
import * as csUtils from "@helpshiftdev/cs-utils";
export async function getTableStorage(
    request: HttpRequest,
    context: InvocationContext
): Promise<any> {
    let response = await csUtils.readDataFromTable(
        process.env.AzureStorageAccountName,
        process.env.AzureStorageTableName,
        `userId eq '${process.env.Key}'`,
        context
    );
    return response;
}

app.http("getTableStorage", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    handler: getTableStorage,
});
