import {
    app,
    HttpRequest,
    HttpResponseInit,
    InvocationContext,
} from "@azure/functions";
import * as csUtils from "@helpshiftdev/cs-utils";
export async function updateTableStorage(
    request: HttpRequest,
    context: InvocationContext
): Promise<any> {
    const formdata = await request.formData();
    let jsonFormData = {};
    for (const entry of formdata.entries()) {
        jsonFormData[entry[0]] = entry[1];
    }

    let data: [object] = [jsonFormData];

    let response = await csUtils.updateDataFromTable(
        process.env.AzureStorageAccountName,
        process.env.AzureStorageTableName,
        data,
        context
    );
    return response;
}

app.http("updateTableStorage", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: updateTableStorage,
});
