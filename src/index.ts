import * as express from 'express';
import * as url from 'url';
import { GraphiQLData } from './renderGraphiQL';
import { resolveGraphiQLString } from './resolveGraphiQLString';

export interface ExpressGraphiQLOptionsFunction {
  (req?: express.Request): GraphiQLData | Promise<GraphiQLData>;
}

export function graphiqlExpress(options: GraphiQLData | ExpressGraphiQLOptionsFunction) {
  return (req: express.Request, res: express.Response, next: any) => {
    const query = req.url && url.parse(req.url, true).query;
    resolveGraphiQLString(query, options, req).then(graphiqlString => {
      res.setHeader('Content-Type', 'text/html');
      res.write(graphiqlString);
      res.end();
    }, error => next(error));
  };
}
