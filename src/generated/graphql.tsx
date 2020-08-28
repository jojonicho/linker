import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
  linkers: PaginatedLinkers;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryLinkersArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  image: Scalars['String'];
  linkers?: Maybe<Array<Linker>>;
  messages?: Maybe<Array<Message>>;
  channels?: Maybe<Array<Channel>>;
};

export type Linker = {
  __typename?: 'Linker';
  id: Scalars['Int'];
  date: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  links?: Maybe<Array<Link>>;
  userId: Scalars['Float'];
  user: User;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['Int'];
  date: Scalars['String'];
  url: Scalars['String'];
  linkerId: Scalars['Float'];
  linker: Linker;
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['Int'];
  date: Scalars['Timestamp'];
  content: Scalars['String'];
  user: User;
  channel?: Maybe<Channel>;
};


export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
  name: Scalars['String'];
  users: Array<User>;
  image: Scalars['String'];
  messages: Array<Message>;
};

export type PaginatedLinkers = {
  __typename?: 'PaginatedLinkers';
  linkers: Array<Linker>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: Scalars['Boolean'];
  login: User;
  logout: Scalars['Boolean'];
  changeImage: Scalars['String'];
  createLinker: Linker;
  createLink: Link;
  updateLinker?: Maybe<Linker>;
  deleteLinker: Scalars['Boolean'];
  updateLink: Link;
  deleteLink: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangeImageArgs = {
  image: Scalars['String'];
};


export type MutationCreateLinkerArgs = {
  input: LinkerInput;
};


export type MutationCreateLinkArgs = {
  linkerId: Scalars['Int'];
  url: Scalars['String'];
};


export type MutationUpdateLinkerArgs = {
  link?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};


export type MutationDeleteLinkerArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateLinkArgs = {
  id: Scalars['Int'];
  url: Scalars['String'];
};


export type MutationDeleteLinkArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LinkerInput = {
  title: Scalars['String'];
  description: Scalars['String'];
};

export type CreateLinkMutationVariables = Exact<{
  url: Scalars['String'];
  linkerId: Scalars['Int'];
}>;


export type CreateLinkMutation = (
  { __typename?: 'Mutation' }
  & { createLink: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'url'>
  ) }
);

export type DeleteLinkMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLinkMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLink'>
);

export type UpdateLinkMutationVariables = Exact<{
  id: Scalars['Int'];
  url: Scalars['String'];
}>;


export type UpdateLinkMutation = (
  { __typename?: 'Mutation' }
  & { updateLink: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'url' | 'date'>
  ) }
);

export type CreateLinkerMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateLinkerMutation = (
  { __typename?: 'Mutation' }
  & { createLinker: (
    { __typename?: 'Linker' }
    & Pick<Linker, 'id' | 'date' | 'title' | 'description' | 'userId'>
  ) }
);

export type DeleteLinkerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteLinkerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLinker'>
);

export type LinkersQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type LinkersQuery = (
  { __typename?: 'Query' }
  & { linkers: (
    { __typename?: 'PaginatedLinkers' }
    & Pick<PaginatedLinkers, 'hasMore'>
    & { linkers: Array<(
      { __typename?: 'Linker' }
      & Pick<Linker, 'id' | 'date' | 'title' | 'description'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username' | 'email' | 'image'>
      ), links?: Maybe<Array<(
        { __typename?: 'Link' }
        & Pick<Link, 'id' | 'url'>
      )>> }
    )> }
  ) }
);

export type UpdateLinkerMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
}>;


export type UpdateLinkerMutation = (
  { __typename?: 'Mutation' }
  & { updateLinker?: Maybe<(
    { __typename?: 'Linker' }
    & Pick<Linker, 'id' | 'date' | 'title' | 'description' | 'userId'>
  )> }
);

export type ChangeImageMutationVariables = Exact<{
  image: Scalars['String'];
}>;


export type ChangeImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeImage'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'image'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'image'>
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'image'>
    & { linkers?: Maybe<Array<(
      { __typename?: 'Linker' }
      & Pick<Linker, 'id' | 'title'>
    )>> }
  )> }
);


export const CreateLinkDocument = gql`
    mutation CreateLink($url: String!, $linkerId: Int!) {
  createLink(url: $url, linkerId: $linkerId) {
    id
    url
  }
}
    `;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      url: // value for 'url'
 *      linkerId: // value for 'linkerId'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, baseOptions);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const DeleteLinkDocument = gql`
    mutation DeleteLink($id: Int!) {
  deleteLink(id: $id)
}
    `;
export type DeleteLinkMutationFn = Apollo.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, baseOptions);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.MutationResult<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.BaseMutationOptions<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const UpdateLinkDocument = gql`
    mutation UpdateLink($id: Int!, $url: String!) {
  updateLink(id: $id, url: $url) {
    id
    url
    date
  }
}
    `;
export type UpdateLinkMutationFn = Apollo.MutationFunction<UpdateLinkMutation, UpdateLinkMutationVariables>;

/**
 * __useUpdateLinkMutation__
 *
 * To run a mutation, you first call `useUpdateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkMutation, { data, loading, error }] = useUpdateLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkMutation, UpdateLinkMutationVariables>) {
        return Apollo.useMutation<UpdateLinkMutation, UpdateLinkMutationVariables>(UpdateLinkDocument, baseOptions);
      }
export type UpdateLinkMutationHookResult = ReturnType<typeof useUpdateLinkMutation>;
export type UpdateLinkMutationResult = Apollo.MutationResult<UpdateLinkMutation>;
export type UpdateLinkMutationOptions = Apollo.BaseMutationOptions<UpdateLinkMutation, UpdateLinkMutationVariables>;
export const CreateLinkerDocument = gql`
    mutation CreateLinker($title: String!, $description: String!) {
  createLinker(input: {title: $title, description: $description}) {
    id
    date
    title
    description
    userId
  }
}
    `;
export type CreateLinkerMutationFn = Apollo.MutationFunction<CreateLinkerMutation, CreateLinkerMutationVariables>;

/**
 * __useCreateLinkerMutation__
 *
 * To run a mutation, you first call `useCreateLinkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkerMutation, { data, loading, error }] = useCreateLinkerMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateLinkerMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkerMutation, CreateLinkerMutationVariables>) {
        return Apollo.useMutation<CreateLinkerMutation, CreateLinkerMutationVariables>(CreateLinkerDocument, baseOptions);
      }
export type CreateLinkerMutationHookResult = ReturnType<typeof useCreateLinkerMutation>;
export type CreateLinkerMutationResult = Apollo.MutationResult<CreateLinkerMutation>;
export type CreateLinkerMutationOptions = Apollo.BaseMutationOptions<CreateLinkerMutation, CreateLinkerMutationVariables>;
export const DeleteLinkerDocument = gql`
    mutation DeleteLinker($id: Int!) {
  deleteLinker(id: $id)
}
    `;
export type DeleteLinkerMutationFn = Apollo.MutationFunction<DeleteLinkerMutation, DeleteLinkerMutationVariables>;

/**
 * __useDeleteLinkerMutation__
 *
 * To run a mutation, you first call `useDeleteLinkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkerMutation, { data, loading, error }] = useDeleteLinkerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLinkerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkerMutation, DeleteLinkerMutationVariables>) {
        return Apollo.useMutation<DeleteLinkerMutation, DeleteLinkerMutationVariables>(DeleteLinkerDocument, baseOptions);
      }
export type DeleteLinkerMutationHookResult = ReturnType<typeof useDeleteLinkerMutation>;
export type DeleteLinkerMutationResult = Apollo.MutationResult<DeleteLinkerMutation>;
export type DeleteLinkerMutationOptions = Apollo.BaseMutationOptions<DeleteLinkerMutation, DeleteLinkerMutationVariables>;
export const LinkersDocument = gql`
    query Linkers($limit: Int!, $cursor: String) {
  linkers(limit: $limit, cursor: $cursor) {
    linkers {
      id
      date
      title
      description
      user {
        id
        username
        email
        image
      }
      links {
        id
        url
      }
    }
    hasMore
  }
}
    `;

/**
 * __useLinkersQuery__
 *
 * To run a query within a React component, call `useLinkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinkersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useLinkersQuery(baseOptions?: Apollo.QueryHookOptions<LinkersQuery, LinkersQueryVariables>) {
        return Apollo.useQuery<LinkersQuery, LinkersQueryVariables>(LinkersDocument, baseOptions);
      }
export function useLinkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkersQuery, LinkersQueryVariables>) {
          return Apollo.useLazyQuery<LinkersQuery, LinkersQueryVariables>(LinkersDocument, baseOptions);
        }
export type LinkersQueryHookResult = ReturnType<typeof useLinkersQuery>;
export type LinkersLazyQueryHookResult = ReturnType<typeof useLinkersLazyQuery>;
export type LinkersQueryResult = Apollo.QueryResult<LinkersQuery, LinkersQueryVariables>;
export const UpdateLinkerDocument = gql`
    mutation UpdateLinker($title: String, $description: String, $id: Int!) {
  updateLinker(title: $title, description: $description, id: $id) {
    id
    date
    title
    description
    userId
  }
}
    `;
export type UpdateLinkerMutationFn = Apollo.MutationFunction<UpdateLinkerMutation, UpdateLinkerMutationVariables>;

/**
 * __useUpdateLinkerMutation__
 *
 * To run a mutation, you first call `useUpdateLinkerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLinkerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLinkerMutation, { data, loading, error }] = useUpdateLinkerMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateLinkerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLinkerMutation, UpdateLinkerMutationVariables>) {
        return Apollo.useMutation<UpdateLinkerMutation, UpdateLinkerMutationVariables>(UpdateLinkerDocument, baseOptions);
      }
export type UpdateLinkerMutationHookResult = ReturnType<typeof useUpdateLinkerMutation>;
export type UpdateLinkerMutationResult = Apollo.MutationResult<UpdateLinkerMutation>;
export type UpdateLinkerMutationOptions = Apollo.BaseMutationOptions<UpdateLinkerMutation, UpdateLinkerMutationVariables>;
export const ChangeImageDocument = gql`
    mutation ChangeImage($image: String!) {
  changeImage(image: $image)
}
    `;
export type ChangeImageMutationFn = Apollo.MutationFunction<ChangeImageMutation, ChangeImageMutationVariables>;

/**
 * __useChangeImageMutation__
 *
 * To run a mutation, you first call `useChangeImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeImageMutation, { data, loading, error }] = useChangeImageMutation({
 *   variables: {
 *      image: // value for 'image'
 *   },
 * });
 */
export function useChangeImageMutation(baseOptions?: Apollo.MutationHookOptions<ChangeImageMutation, ChangeImageMutationVariables>) {
        return Apollo.useMutation<ChangeImageMutation, ChangeImageMutationVariables>(ChangeImageDocument, baseOptions);
      }
export type ChangeImageMutationHookResult = ReturnType<typeof useChangeImageMutation>;
export type ChangeImageMutationResult = Apollo.MutationResult<ChangeImageMutation>;
export type ChangeImageMutationOptions = Apollo.BaseMutationOptions<ChangeImageMutation, ChangeImageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    username
    email
    image
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    image
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(input: {username: $username, email: $email, password: $password})
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UserDocument = gql`
    query User($id: Int!) {
  user(id: $id) {
    id
    username
    email
    image
    linkers {
      id
      title
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;