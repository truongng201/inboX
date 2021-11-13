import { RemoteGraphQLDataSource } from "@apollo/gateway";

export default class AppSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    const headers = context.req.headers;

    if (headers === undefined) return;

    Object.keys(headers).map(
      (key) => request.http && request.http.headers.set(key, headers[key])
    );
  }
}
