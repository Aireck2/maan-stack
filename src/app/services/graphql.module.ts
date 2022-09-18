import { NgModule } from '@angular/core';
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const uri = `${environment.graphql_uri}/graphql`;

export const createApollo = (httpLink: HttpLink): ApolloClientOptions<any> => {
  const newLink = httpLink.create({ uri });
  const cache = new InMemoryCache();

  return {
    link: newLink,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  };
};

@NgModule({
  exports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphqlModule {}
