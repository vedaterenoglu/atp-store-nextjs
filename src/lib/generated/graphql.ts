import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  bigint: { input: number; output: number }
  date: { input: string; output: string }
  numeric: { input: number; output: number }
  timestamptz: { input: string; output: string }
  timetz: { input: string; output: string }
  uuid: { input: string; output: string }
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_comparison_exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>
  _gt?: InputMaybe<Scalars['Boolean']['input']>
  _gte?: InputMaybe<Scalars['Boolean']['input']>
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['Boolean']['input']>
  _lte?: InputMaybe<Scalars['Boolean']['input']>
  _neq?: InputMaybe<Scalars['Boolean']['input']>
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_comparison_exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>
  _gt?: InputMaybe<Scalars['Int']['input']>
  _gte?: InputMaybe<Scalars['Int']['input']>
  _in?: InputMaybe<Array<Scalars['Int']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['Int']['input']>
  _lte?: InputMaybe<Scalars['Int']['input']>
  _neq?: InputMaybe<Scalars['Int']['input']>
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_comparison_exp = {
  _eq?: InputMaybe<Scalars['String']['input']>
  _gt?: InputMaybe<Scalars['String']['input']>
  _gte?: InputMaybe<Scalars['String']['input']>
  _ilike?: InputMaybe<Scalars['String']['input']>
  _in?: InputMaybe<Array<Scalars['String']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _like?: InputMaybe<Scalars['String']['input']>
  _lt?: InputMaybe<Scalars['String']['input']>
  _lte?: InputMaybe<Scalars['String']['input']>
  _neq?: InputMaybe<Scalars['String']['input']>
  _nilike?: InputMaybe<Scalars['String']['input']>
  _nin?: InputMaybe<Array<Scalars['String']['input']>>
  _nlike?: InputMaybe<Scalars['String']['input']>
  _nsimilar?: InputMaybe<Scalars['String']['input']>
  _similar?: InputMaybe<Scalars['String']['input']>
}

/** columns and relationships of "__admin_pass" */
export type __admin_pass = {
  admin_pass_id: Scalars['Int']['output']
  admin_pass_key: Scalars['String']['output']
}

/** aggregated selection of "__admin_pass" */
export type __admin_pass_aggregate = {
  aggregate?: Maybe<__admin_pass_aggregate_fields>
  nodes: Array<__admin_pass>
}

/** aggregate fields of "__admin_pass" */
export type __admin_pass_aggregate_fields = {
  avg?: Maybe<__admin_pass_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<__admin_pass_max_fields>
  min?: Maybe<__admin_pass_min_fields>
  stddev?: Maybe<__admin_pass_stddev_fields>
  stddev_pop?: Maybe<__admin_pass_stddev_pop_fields>
  stddev_samp?: Maybe<__admin_pass_stddev_samp_fields>
  sum?: Maybe<__admin_pass_sum_fields>
  var_pop?: Maybe<__admin_pass_var_pop_fields>
  var_samp?: Maybe<__admin_pass_var_samp_fields>
  variance?: Maybe<__admin_pass_variance_fields>
}

/** aggregate fields of "__admin_pass" */
export type __admin_pass_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<__admin_pass_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type __admin_pass_avg_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** Boolean expression to filter rows from the table "__admin_pass". All fields are combined with a logical 'AND'. */
export type __admin_pass_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<__admin_pass_bool_exp>>>
  _not?: InputMaybe<__admin_pass_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<__admin_pass_bool_exp>>>
  admin_pass_id?: InputMaybe<Int_comparison_exp>
  admin_pass_key?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "__admin_pass" */
export type __admin_pass_constraint =
  /** unique or primary key constraint */
  '__admin_pass_pkey'

/** input type for incrementing integer columne in table "__admin_pass" */
export type __admin_pass_inc_input = {
  admin_pass_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "__admin_pass" */
export type __admin_pass_insert_input = {
  admin_pass_id?: InputMaybe<Scalars['Int']['input']>
  admin_pass_key?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type __admin_pass_max_fields = {
  admin_pass_id?: Maybe<Scalars['Int']['output']>
  admin_pass_key?: Maybe<Scalars['String']['output']>
}

/** aggregate min on columns */
export type __admin_pass_min_fields = {
  admin_pass_id?: Maybe<Scalars['Int']['output']>
  admin_pass_key?: Maybe<Scalars['String']['output']>
}

/** response of any mutation on the table "__admin_pass" */
export type __admin_pass_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<__admin_pass>
}

/** on conflict condition type for table "__admin_pass" */
export type __admin_pass_on_conflict = {
  constraint: __admin_pass_constraint
  update_columns: Array<__admin_pass_update_column>
  where?: InputMaybe<__admin_pass_bool_exp>
}

/** ordering options when selecting data from "__admin_pass" */
export type __admin_pass_order_by = {
  admin_pass_id?: InputMaybe<order_by>
  admin_pass_key?: InputMaybe<order_by>
}

/** select columns of table "__admin_pass" */
export type __admin_pass_select_column =
  /** column name */
  | 'admin_pass_id'
  /** column name */
  | 'admin_pass_key'

/** input type for updating data in table "__admin_pass" */
export type __admin_pass_set_input = {
  admin_pass_id?: InputMaybe<Scalars['Int']['input']>
  admin_pass_key?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type __admin_pass_stddev_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type __admin_pass_stddev_pop_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type __admin_pass_stddev_samp_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** aggregate sum on columns */
export type __admin_pass_sum_fields = {
  admin_pass_id?: Maybe<Scalars['Int']['output']>
}

/** update columns of table "__admin_pass" */
export type __admin_pass_update_column =
  /** column name */
  | 'admin_pass_id'
  /** column name */
  | 'admin_pass_key'

/** aggregate var_pop on columns */
export type __admin_pass_var_pop_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type __admin_pass_var_samp_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type __admin_pass_variance_fields = {
  admin_pass_id?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "__privilege_pass" */
export type __privilege_pass = {
  created_at?: Maybe<Scalars['bigint']['output']>
  privilege_id: Scalars['Int']['output']
  privilege_pass_key: Scalars['String']['output']
  valid_minutes: Scalars['Int']['output']
}

/** aggregated selection of "__privilege_pass" */
export type __privilege_pass_aggregate = {
  aggregate?: Maybe<__privilege_pass_aggregate_fields>
  nodes: Array<__privilege_pass>
}

/** aggregate fields of "__privilege_pass" */
export type __privilege_pass_aggregate_fields = {
  avg?: Maybe<__privilege_pass_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<__privilege_pass_max_fields>
  min?: Maybe<__privilege_pass_min_fields>
  stddev?: Maybe<__privilege_pass_stddev_fields>
  stddev_pop?: Maybe<__privilege_pass_stddev_pop_fields>
  stddev_samp?: Maybe<__privilege_pass_stddev_samp_fields>
  sum?: Maybe<__privilege_pass_sum_fields>
  var_pop?: Maybe<__privilege_pass_var_pop_fields>
  var_samp?: Maybe<__privilege_pass_var_samp_fields>
  variance?: Maybe<__privilege_pass_variance_fields>
}

/** aggregate fields of "__privilege_pass" */
export type __privilege_pass_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<__privilege_pass_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate avg on columns */
export type __privilege_pass_avg_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** Boolean expression to filter rows from the table "__privilege_pass". All fields are combined with a logical 'AND'. */
export type __privilege_pass_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<__privilege_pass_bool_exp>>>
  _not?: InputMaybe<__privilege_pass_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<__privilege_pass_bool_exp>>>
  created_at?: InputMaybe<bigint_comparison_exp>
  privilege_id?: InputMaybe<Int_comparison_exp>
  privilege_pass_key?: InputMaybe<String_comparison_exp>
  valid_minutes?: InputMaybe<Int_comparison_exp>
}

/** unique or primary key constraints on table "__privilege_pass" */
export type __privilege_pass_constraint =
  /** unique or primary key constraint */
  | '__privilege_pass_privilege_id_key'
  /** unique or primary key constraint */
  | '__privileges_pkey'

/** input type for incrementing integer columne in table "__privilege_pass" */
export type __privilege_pass_inc_input = {
  created_at?: InputMaybe<Scalars['bigint']['input']>
  privilege_id?: InputMaybe<Scalars['Int']['input']>
  valid_minutes?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "__privilege_pass" */
export type __privilege_pass_insert_input = {
  created_at?: InputMaybe<Scalars['bigint']['input']>
  privilege_id?: InputMaybe<Scalars['Int']['input']>
  privilege_pass_key?: InputMaybe<Scalars['String']['input']>
  valid_minutes?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate max on columns */
export type __privilege_pass_max_fields = {
  created_at?: Maybe<Scalars['bigint']['output']>
  privilege_id?: Maybe<Scalars['Int']['output']>
  privilege_pass_key?: Maybe<Scalars['String']['output']>
  valid_minutes?: Maybe<Scalars['Int']['output']>
}

/** aggregate min on columns */
export type __privilege_pass_min_fields = {
  created_at?: Maybe<Scalars['bigint']['output']>
  privilege_id?: Maybe<Scalars['Int']['output']>
  privilege_pass_key?: Maybe<Scalars['String']['output']>
  valid_minutes?: Maybe<Scalars['Int']['output']>
}

/** response of any mutation on the table "__privilege_pass" */
export type __privilege_pass_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<__privilege_pass>
}

/** on conflict condition type for table "__privilege_pass" */
export type __privilege_pass_on_conflict = {
  constraint: __privilege_pass_constraint
  update_columns: Array<__privilege_pass_update_column>
  where?: InputMaybe<__privilege_pass_bool_exp>
}

/** ordering options when selecting data from "__privilege_pass" */
export type __privilege_pass_order_by = {
  created_at?: InputMaybe<order_by>
  privilege_id?: InputMaybe<order_by>
  privilege_pass_key?: InputMaybe<order_by>
  valid_minutes?: InputMaybe<order_by>
}

/** select columns of table "__privilege_pass" */
export type __privilege_pass_select_column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'privilege_id'
  /** column name */
  | 'privilege_pass_key'
  /** column name */
  | 'valid_minutes'

/** input type for updating data in table "__privilege_pass" */
export type __privilege_pass_set_input = {
  created_at?: InputMaybe<Scalars['bigint']['input']>
  privilege_id?: InputMaybe<Scalars['Int']['input']>
  privilege_pass_key?: InputMaybe<Scalars['String']['input']>
  valid_minutes?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type __privilege_pass_stddev_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_pop on columns */
export type __privilege_pass_stddev_pop_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** aggregate stddev_samp on columns */
export type __privilege_pass_stddev_samp_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** aggregate sum on columns */
export type __privilege_pass_sum_fields = {
  created_at?: Maybe<Scalars['bigint']['output']>
  privilege_id?: Maybe<Scalars['Int']['output']>
  valid_minutes?: Maybe<Scalars['Int']['output']>
}

/** update columns of table "__privilege_pass" */
export type __privilege_pass_update_column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'privilege_id'
  /** column name */
  | 'privilege_pass_key'
  /** column name */
  | 'valid_minutes'

/** aggregate var_pop on columns */
export type __privilege_pass_var_pop_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** aggregate var_samp on columns */
export type __privilege_pass_var_samp_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** aggregate variance on columns */
export type __privilege_pass_variance_fields = {
  created_at?: Maybe<Scalars['Float']['output']>
  privilege_id?: Maybe<Scalars['Float']['output']>
  valid_minutes?: Maybe<Scalars['Float']['output']>
}

/** columns and relationships of "_our_companies_persistent_state" */
export type _our_companies_persistent_state = {
  /** An object relationship */
  company: companies
  company_nickname: Scalars['String']['output']
}

/** aggregated selection of "_our_companies_persistent_state" */
export type _our_companies_persistent_state_aggregate = {
  aggregate?: Maybe<_our_companies_persistent_state_aggregate_fields>
  nodes: Array<_our_companies_persistent_state>
}

/** aggregate fields of "_our_companies_persistent_state" */
export type _our_companies_persistent_state_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_our_companies_persistent_state_max_fields>
  min?: Maybe<_our_companies_persistent_state_min_fields>
}

/** aggregate fields of "_our_companies_persistent_state" */
export type _our_companies_persistent_state_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_our_companies_persistent_state_max_order_by>
  min?: InputMaybe<_our_companies_persistent_state_min_order_by>
}

/** input type for inserting array relation for remote table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_arr_rel_insert_input = {
  data: Array<_our_companies_persistent_state_insert_input>
  on_conflict?: InputMaybe<_our_companies_persistent_state_on_conflict>
}

/** Boolean expression to filter rows from the table "_our_companies_persistent_state". All fields are combined with a logical 'AND'. */
export type _our_companies_persistent_state_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_our_companies_persistent_state_bool_exp>>>
  _not?: InputMaybe<_our_companies_persistent_state_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_our_companies_persistent_state_bool_exp>>>
  company?: InputMaybe<companies_bool_exp>
  company_nickname?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_constraint =
  /** unique or primary key constraint */
  '_our_companies_persistent_state_pkey'

/** input type for inserting data into table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_insert_input = {
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_nickname?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type _our_companies_persistent_state_max_fields = {
  company_nickname?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_max_order_by = {
  company_nickname?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _our_companies_persistent_state_min_fields = {
  company_nickname?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_min_order_by = {
  company_nickname?: InputMaybe<order_by>
}

/** response of any mutation on the table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_our_companies_persistent_state>
}

/** input type for inserting object relation for remote table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_obj_rel_insert_input = {
  data: _our_companies_persistent_state_insert_input
  on_conflict?: InputMaybe<_our_companies_persistent_state_on_conflict>
}

/** on conflict condition type for table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_on_conflict = {
  constraint: _our_companies_persistent_state_constraint
  update_columns: Array<_our_companies_persistent_state_update_column>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** ordering options when selecting data from "_our_companies_persistent_state" */
export type _our_companies_persistent_state_order_by = {
  company?: InputMaybe<companies_order_by>
  company_nickname?: InputMaybe<order_by>
}

/** select columns of table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_select_column =
  /** column name */
  'company_nickname'

/** input type for updating data in table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_set_input = {
  company_nickname?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "_our_companies_persistent_state" */
export type _our_companies_persistent_state_update_column =
  /** column name */
  'company_nickname'

/** columns and relationships of "_type_account_plan" */
export type _type_account_plan = {
  account_id_name: Scalars['String']['output']
  group_level_first: Scalars['String']['output']
  group_level_second?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "_type_account_plan" */
export type _type_account_plan_aggregate = {
  aggregate?: Maybe<_type_account_plan_aggregate_fields>
  nodes: Array<_type_account_plan>
}

/** aggregate fields of "_type_account_plan" */
export type _type_account_plan_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_type_account_plan_max_fields>
  min?: Maybe<_type_account_plan_min_fields>
}

/** aggregate fields of "_type_account_plan" */
export type _type_account_plan_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_type_account_plan_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_type_account_plan" */
export type _type_account_plan_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_type_account_plan_max_order_by>
  min?: InputMaybe<_type_account_plan_min_order_by>
}

/** input type for inserting array relation for remote table "_type_account_plan" */
export type _type_account_plan_arr_rel_insert_input = {
  data: Array<_type_account_plan_insert_input>
  on_conflict?: InputMaybe<_type_account_plan_on_conflict>
}

/** Boolean expression to filter rows from the table "_type_account_plan". All fields are combined with a logical 'AND'. */
export type _type_account_plan_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_type_account_plan_bool_exp>>>
  _not?: InputMaybe<_type_account_plan_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_type_account_plan_bool_exp>>>
  account_id_name?: InputMaybe<String_comparison_exp>
  group_level_first?: InputMaybe<String_comparison_exp>
  group_level_second?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "_type_account_plan" */
export type _type_account_plan_constraint =
  /** unique or primary key constraint */
  | '_type_account_plan_account_id_key'
  /** unique or primary key constraint */
  | 'account_plan2_pkey'

/** input type for inserting data into table "_type_account_plan" */
export type _type_account_plan_insert_input = {
  account_id_name?: InputMaybe<Scalars['String']['input']>
  group_level_first?: InputMaybe<Scalars['String']['input']>
  group_level_second?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type _type_account_plan_max_fields = {
  account_id_name?: Maybe<Scalars['String']['output']>
  group_level_first?: Maybe<Scalars['String']['output']>
  group_level_second?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_type_account_plan" */
export type _type_account_plan_max_order_by = {
  account_id_name?: InputMaybe<order_by>
  group_level_first?: InputMaybe<order_by>
  group_level_second?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _type_account_plan_min_fields = {
  account_id_name?: Maybe<Scalars['String']['output']>
  group_level_first?: Maybe<Scalars['String']['output']>
  group_level_second?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_type_account_plan" */
export type _type_account_plan_min_order_by = {
  account_id_name?: InputMaybe<order_by>
  group_level_first?: InputMaybe<order_by>
  group_level_second?: InputMaybe<order_by>
}

/** response of any mutation on the table "_type_account_plan" */
export type _type_account_plan_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_type_account_plan>
}

/** input type for inserting object relation for remote table "_type_account_plan" */
export type _type_account_plan_obj_rel_insert_input = {
  data: _type_account_plan_insert_input
  on_conflict?: InputMaybe<_type_account_plan_on_conflict>
}

/** on conflict condition type for table "_type_account_plan" */
export type _type_account_plan_on_conflict = {
  constraint: _type_account_plan_constraint
  update_columns: Array<_type_account_plan_update_column>
  where?: InputMaybe<_type_account_plan_bool_exp>
}

/** ordering options when selecting data from "_type_account_plan" */
export type _type_account_plan_order_by = {
  account_id_name?: InputMaybe<order_by>
  group_level_first?: InputMaybe<order_by>
  group_level_second?: InputMaybe<order_by>
}

/** select columns of table "_type_account_plan" */
export type _type_account_plan_select_column =
  /** column name */
  | 'account_id_name'
  /** column name */
  | 'group_level_first'
  /** column name */
  | 'group_level_second'

/** input type for updating data in table "_type_account_plan" */
export type _type_account_plan_set_input = {
  account_id_name?: InputMaybe<Scalars['String']['input']>
  group_level_first?: InputMaybe<Scalars['String']['input']>
  group_level_second?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "_type_account_plan" */
export type _type_account_plan_update_column =
  /** column name */
  | 'account_id_name'
  /** column name */
  | 'group_level_first'
  /** column name */
  | 'group_level_second'

/** columns and relationships of "_type_moms_code" */
export type _type_moms_code = {
  moms_id: Scalars['Int']['output']
  moms_percent: Scalars['Int']['output']
  /** An array relationship */
  stocks: Array<stock>
  /** An aggregated array relationship */
  stocks_aggregate: stock_aggregate
}

/** columns and relationships of "_type_moms_code" */
export type _type_moms_codestocksArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** columns and relationships of "_type_moms_code" */
export type _type_moms_codestocks_aggregateArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** aggregated selection of "_type_moms_code" */
export type _type_moms_code_aggregate = {
  aggregate?: Maybe<_type_moms_code_aggregate_fields>
  nodes: Array<_type_moms_code>
}

/** aggregate fields of "_type_moms_code" */
export type _type_moms_code_aggregate_fields = {
  avg?: Maybe<_type_moms_code_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_type_moms_code_max_fields>
  min?: Maybe<_type_moms_code_min_fields>
  stddev?: Maybe<_type_moms_code_stddev_fields>
  stddev_pop?: Maybe<_type_moms_code_stddev_pop_fields>
  stddev_samp?: Maybe<_type_moms_code_stddev_samp_fields>
  sum?: Maybe<_type_moms_code_sum_fields>
  var_pop?: Maybe<_type_moms_code_var_pop_fields>
  var_samp?: Maybe<_type_moms_code_var_samp_fields>
  variance?: Maybe<_type_moms_code_variance_fields>
}

/** aggregate fields of "_type_moms_code" */
export type _type_moms_code_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_type_moms_code_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_type_moms_code" */
export type _type_moms_code_aggregate_order_by = {
  avg?: InputMaybe<_type_moms_code_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<_type_moms_code_max_order_by>
  min?: InputMaybe<_type_moms_code_min_order_by>
  stddev?: InputMaybe<_type_moms_code_stddev_order_by>
  stddev_pop?: InputMaybe<_type_moms_code_stddev_pop_order_by>
  stddev_samp?: InputMaybe<_type_moms_code_stddev_samp_order_by>
  sum?: InputMaybe<_type_moms_code_sum_order_by>
  var_pop?: InputMaybe<_type_moms_code_var_pop_order_by>
  var_samp?: InputMaybe<_type_moms_code_var_samp_order_by>
  variance?: InputMaybe<_type_moms_code_variance_order_by>
}

/** input type for inserting array relation for remote table "_type_moms_code" */
export type _type_moms_code_arr_rel_insert_input = {
  data: Array<_type_moms_code_insert_input>
  on_conflict?: InputMaybe<_type_moms_code_on_conflict>
}

/** aggregate avg on columns */
export type _type_moms_code_avg_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "_type_moms_code" */
export type _type_moms_code_avg_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "_type_moms_code". All fields are combined with a logical 'AND'. */
export type _type_moms_code_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_type_moms_code_bool_exp>>>
  _not?: InputMaybe<_type_moms_code_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_type_moms_code_bool_exp>>>
  moms_id?: InputMaybe<Int_comparison_exp>
  moms_percent?: InputMaybe<Int_comparison_exp>
  stocks?: InputMaybe<stock_bool_exp>
}

/** unique or primary key constraints on table "_type_moms_code" */
export type _type_moms_code_constraint =
  /** unique or primary key constraint */
  | '_type_moms_code_moms_percent_key'
  /** unique or primary key constraint */
  | '_type_moms_code_pkey'

/** input type for incrementing integer columne in table "_type_moms_code" */
export type _type_moms_code_inc_input = {
  moms_id?: InputMaybe<Scalars['Int']['input']>
  moms_percent?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "_type_moms_code" */
export type _type_moms_code_insert_input = {
  moms_id?: InputMaybe<Scalars['Int']['input']>
  moms_percent?: InputMaybe<Scalars['Int']['input']>
  stocks?: InputMaybe<stock_arr_rel_insert_input>
}

/** aggregate max on columns */
export type _type_moms_code_max_fields = {
  moms_id?: Maybe<Scalars['Int']['output']>
  moms_percent?: Maybe<Scalars['Int']['output']>
}

/** order by max() on columns of table "_type_moms_code" */
export type _type_moms_code_max_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _type_moms_code_min_fields = {
  moms_id?: Maybe<Scalars['Int']['output']>
  moms_percent?: Maybe<Scalars['Int']['output']>
}

/** order by min() on columns of table "_type_moms_code" */
export type _type_moms_code_min_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** response of any mutation on the table "_type_moms_code" */
export type _type_moms_code_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_type_moms_code>
}

/** input type for inserting object relation for remote table "_type_moms_code" */
export type _type_moms_code_obj_rel_insert_input = {
  data: _type_moms_code_insert_input
  on_conflict?: InputMaybe<_type_moms_code_on_conflict>
}

/** on conflict condition type for table "_type_moms_code" */
export type _type_moms_code_on_conflict = {
  constraint: _type_moms_code_constraint
  update_columns: Array<_type_moms_code_update_column>
  where?: InputMaybe<_type_moms_code_bool_exp>
}

/** ordering options when selecting data from "_type_moms_code" */
export type _type_moms_code_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
  stocks_aggregate?: InputMaybe<stock_aggregate_order_by>
}

/** select columns of table "_type_moms_code" */
export type _type_moms_code_select_column =
  /** column name */
  | 'moms_id'
  /** column name */
  | 'moms_percent'

/** input type for updating data in table "_type_moms_code" */
export type _type_moms_code_set_input = {
  moms_id?: InputMaybe<Scalars['Int']['input']>
  moms_percent?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type _type_moms_code_stddev_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "_type_moms_code" */
export type _type_moms_code_stddev_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type _type_moms_code_stddev_pop_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "_type_moms_code" */
export type _type_moms_code_stddev_pop_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type _type_moms_code_stddev_samp_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "_type_moms_code" */
export type _type_moms_code_stddev_samp_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type _type_moms_code_sum_fields = {
  moms_id?: Maybe<Scalars['Int']['output']>
  moms_percent?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "_type_moms_code" */
export type _type_moms_code_sum_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** update columns of table "_type_moms_code" */
export type _type_moms_code_update_column =
  /** column name */
  | 'moms_id'
  /** column name */
  | 'moms_percent'

/** aggregate var_pop on columns */
export type _type_moms_code_var_pop_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "_type_moms_code" */
export type _type_moms_code_var_pop_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type _type_moms_code_var_samp_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "_type_moms_code" */
export type _type_moms_code_var_samp_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type _type_moms_code_variance_fields = {
  moms_id?: Maybe<Scalars['Float']['output']>
  moms_percent?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "_type_moms_code" */
export type _type_moms_code_variance_order_by = {
  moms_id?: InputMaybe<order_by>
  moms_percent?: InputMaybe<order_by>
}

/** columns and relationships of "_type_stock_groups" */
export type _type_stock_groups = {
  alt_text: Scalars['String']['output']
  image_url: Scalars['String']['output']
  our_company: Scalars['String']['output']
  stock_groups: Scalars['String']['output']
  /** An array relationship */
  stocks: Array<stock>
  /** An aggregated array relationship */
  stocks_aggregate: stock_aggregate
  willBeListed: Scalars['Boolean']['output']
}

/** columns and relationships of "_type_stock_groups" */
export type _type_stock_groupsstocksArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** columns and relationships of "_type_stock_groups" */
export type _type_stock_groupsstocks_aggregateArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** aggregated selection of "_type_stock_groups" */
export type _type_stock_groups_aggregate = {
  aggregate?: Maybe<_type_stock_groups_aggregate_fields>
  nodes: Array<_type_stock_groups>
}

/** aggregate fields of "_type_stock_groups" */
export type _type_stock_groups_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_type_stock_groups_max_fields>
  min?: Maybe<_type_stock_groups_min_fields>
}

/** aggregate fields of "_type_stock_groups" */
export type _type_stock_groups_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_type_stock_groups_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_type_stock_groups" */
export type _type_stock_groups_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_type_stock_groups_max_order_by>
  min?: InputMaybe<_type_stock_groups_min_order_by>
}

/** input type for inserting array relation for remote table "_type_stock_groups" */
export type _type_stock_groups_arr_rel_insert_input = {
  data: Array<_type_stock_groups_insert_input>
  on_conflict?: InputMaybe<_type_stock_groups_on_conflict>
}

/** Boolean expression to filter rows from the table "_type_stock_groups". All fields are combined with a logical 'AND'. */
export type _type_stock_groups_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_type_stock_groups_bool_exp>>>
  _not?: InputMaybe<_type_stock_groups_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_type_stock_groups_bool_exp>>>
  alt_text?: InputMaybe<String_comparison_exp>
  image_url?: InputMaybe<String_comparison_exp>
  our_company?: InputMaybe<String_comparison_exp>
  stock_groups?: InputMaybe<String_comparison_exp>
  stocks?: InputMaybe<stock_bool_exp>
  willBeListed?: InputMaybe<Boolean_comparison_exp>
}

/** unique or primary key constraints on table "_type_stock_groups" */
export type _type_stock_groups_constraint =
  /** unique or primary key constraint */
  '_type_stock_groups_pkey'

/** input type for inserting data into table "_type_stock_groups" */
export type _type_stock_groups_insert_input = {
  alt_text?: InputMaybe<Scalars['String']['input']>
  image_url?: InputMaybe<Scalars['String']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  stock_groups?: InputMaybe<Scalars['String']['input']>
  stocks?: InputMaybe<stock_arr_rel_insert_input>
  willBeListed?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate max on columns */
export type _type_stock_groups_max_fields = {
  alt_text?: Maybe<Scalars['String']['output']>
  image_url?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  stock_groups?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_type_stock_groups" */
export type _type_stock_groups_max_order_by = {
  alt_text?: InputMaybe<order_by>
  image_url?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  stock_groups?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _type_stock_groups_min_fields = {
  alt_text?: Maybe<Scalars['String']['output']>
  image_url?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  stock_groups?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_type_stock_groups" */
export type _type_stock_groups_min_order_by = {
  alt_text?: InputMaybe<order_by>
  image_url?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  stock_groups?: InputMaybe<order_by>
}

/** response of any mutation on the table "_type_stock_groups" */
export type _type_stock_groups_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_type_stock_groups>
}

/** input type for inserting object relation for remote table "_type_stock_groups" */
export type _type_stock_groups_obj_rel_insert_input = {
  data: _type_stock_groups_insert_input
  on_conflict?: InputMaybe<_type_stock_groups_on_conflict>
}

/** on conflict condition type for table "_type_stock_groups" */
export type _type_stock_groups_on_conflict = {
  constraint: _type_stock_groups_constraint
  update_columns: Array<_type_stock_groups_update_column>
  where?: InputMaybe<_type_stock_groups_bool_exp>
}

/** ordering options when selecting data from "_type_stock_groups" */
export type _type_stock_groups_order_by = {
  alt_text?: InputMaybe<order_by>
  image_url?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  stock_groups?: InputMaybe<order_by>
  stocks_aggregate?: InputMaybe<stock_aggregate_order_by>
  willBeListed?: InputMaybe<order_by>
}

/** select columns of table "_type_stock_groups" */
export type _type_stock_groups_select_column =
  /** column name */
  | 'alt_text'
  /** column name */
  | 'image_url'
  /** column name */
  | 'our_company'
  /** column name */
  | 'stock_groups'
  /** column name */
  | 'willBeListed'

/** input type for updating data in table "_type_stock_groups" */
export type _type_stock_groups_set_input = {
  alt_text?: InputMaybe<Scalars['String']['input']>
  image_url?: InputMaybe<Scalars['String']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  stock_groups?: InputMaybe<Scalars['String']['input']>
  willBeListed?: InputMaybe<Scalars['Boolean']['input']>
}

/** update columns of table "_type_stock_groups" */
export type _type_stock_groups_update_column =
  /** column name */
  | 'alt_text'
  /** column name */
  | 'image_url'
  /** column name */
  | 'our_company'
  /** column name */
  | 'stock_groups'
  /** column name */
  | 'willBeListed'

/** columns and relationships of "_type_stock_unit" */
export type _type_stock_unit = {
  stock_unit: Scalars['String']['output']
  /** An array relationship */
  stocks: Array<stock>
  /** An aggregated array relationship */
  stocks_aggregate: stock_aggregate
}

/** columns and relationships of "_type_stock_unit" */
export type _type_stock_unitstocksArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** columns and relationships of "_type_stock_unit" */
export type _type_stock_unitstocks_aggregateArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** aggregated selection of "_type_stock_unit" */
export type _type_stock_unit_aggregate = {
  aggregate?: Maybe<_type_stock_unit_aggregate_fields>
  nodes: Array<_type_stock_unit>
}

/** aggregate fields of "_type_stock_unit" */
export type _type_stock_unit_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_type_stock_unit_max_fields>
  min?: Maybe<_type_stock_unit_min_fields>
}

/** aggregate fields of "_type_stock_unit" */
export type _type_stock_unit_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_type_stock_unit_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_type_stock_unit" */
export type _type_stock_unit_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_type_stock_unit_max_order_by>
  min?: InputMaybe<_type_stock_unit_min_order_by>
}

/** input type for inserting array relation for remote table "_type_stock_unit" */
export type _type_stock_unit_arr_rel_insert_input = {
  data: Array<_type_stock_unit_insert_input>
  on_conflict?: InputMaybe<_type_stock_unit_on_conflict>
}

/** Boolean expression to filter rows from the table "_type_stock_unit". All fields are combined with a logical 'AND'. */
export type _type_stock_unit_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_type_stock_unit_bool_exp>>>
  _not?: InputMaybe<_type_stock_unit_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_type_stock_unit_bool_exp>>>
  stock_unit?: InputMaybe<String_comparison_exp>
  stocks?: InputMaybe<stock_bool_exp>
}

/** unique or primary key constraints on table "_type_stock_unit" */
export type _type_stock_unit_constraint =
  /** unique or primary key constraint */
  '_type_stock_unit_pkey'

/** input type for inserting data into table "_type_stock_unit" */
export type _type_stock_unit_insert_input = {
  stock_unit?: InputMaybe<Scalars['String']['input']>
  stocks?: InputMaybe<stock_arr_rel_insert_input>
}

/** aggregate max on columns */
export type _type_stock_unit_max_fields = {
  stock_unit?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_type_stock_unit" */
export type _type_stock_unit_max_order_by = {
  stock_unit?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _type_stock_unit_min_fields = {
  stock_unit?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_type_stock_unit" */
export type _type_stock_unit_min_order_by = {
  stock_unit?: InputMaybe<order_by>
}

/** response of any mutation on the table "_type_stock_unit" */
export type _type_stock_unit_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_type_stock_unit>
}

/** input type for inserting object relation for remote table "_type_stock_unit" */
export type _type_stock_unit_obj_rel_insert_input = {
  data: _type_stock_unit_insert_input
  on_conflict?: InputMaybe<_type_stock_unit_on_conflict>
}

/** on conflict condition type for table "_type_stock_unit" */
export type _type_stock_unit_on_conflict = {
  constraint: _type_stock_unit_constraint
  update_columns: Array<_type_stock_unit_update_column>
  where?: InputMaybe<_type_stock_unit_bool_exp>
}

/** ordering options when selecting data from "_type_stock_unit" */
export type _type_stock_unit_order_by = {
  stock_unit?: InputMaybe<order_by>
  stocks_aggregate?: InputMaybe<stock_aggregate_order_by>
}

/** select columns of table "_type_stock_unit" */
export type _type_stock_unit_select_column =
  /** column name */
  'stock_unit'

/** input type for updating data in table "_type_stock_unit" */
export type _type_stock_unit_set_input = {
  stock_unit?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "_type_stock_unit" */
export type _type_stock_unit_update_column =
  /** column name */
  'stock_unit'

/** columns and relationships of "_ups_order_settings" */
export type _ups_order_settings = {
  /** An object relationship */
  _user_persistent_state: _user_persistent_state
  user_nickname: Scalars['String']['output']
}

/** aggregated selection of "_ups_order_settings" */
export type _ups_order_settings_aggregate = {
  aggregate?: Maybe<_ups_order_settings_aggregate_fields>
  nodes: Array<_ups_order_settings>
}

/** aggregate fields of "_ups_order_settings" */
export type _ups_order_settings_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_ups_order_settings_max_fields>
  min?: Maybe<_ups_order_settings_min_fields>
}

/** aggregate fields of "_ups_order_settings" */
export type _ups_order_settings_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_ups_order_settings_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_ups_order_settings" */
export type _ups_order_settings_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_ups_order_settings_max_order_by>
  min?: InputMaybe<_ups_order_settings_min_order_by>
}

/** input type for inserting array relation for remote table "_ups_order_settings" */
export type _ups_order_settings_arr_rel_insert_input = {
  data: Array<_ups_order_settings_insert_input>
  on_conflict?: InputMaybe<_ups_order_settings_on_conflict>
}

/** Boolean expression to filter rows from the table "_ups_order_settings". All fields are combined with a logical 'AND'. */
export type _ups_order_settings_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_ups_order_settings_bool_exp>>>
  _not?: InputMaybe<_ups_order_settings_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_ups_order_settings_bool_exp>>>
  _user_persistent_state?: InputMaybe<_user_persistent_state_bool_exp>
  user_nickname?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "_ups_order_settings" */
export type _ups_order_settings_constraint =
  /** unique or primary key constraint */
  '_ups_order_settings_pkey'

/** input type for inserting data into table "_ups_order_settings" */
export type _ups_order_settings_insert_input = {
  _user_persistent_state?: InputMaybe<_user_persistent_state_obj_rel_insert_input>
  user_nickname?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type _ups_order_settings_max_fields = {
  user_nickname?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_ups_order_settings" */
export type _ups_order_settings_max_order_by = {
  user_nickname?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _ups_order_settings_min_fields = {
  user_nickname?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_ups_order_settings" */
export type _ups_order_settings_min_order_by = {
  user_nickname?: InputMaybe<order_by>
}

/** response of any mutation on the table "_ups_order_settings" */
export type _ups_order_settings_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_ups_order_settings>
}

/** input type for inserting object relation for remote table "_ups_order_settings" */
export type _ups_order_settings_obj_rel_insert_input = {
  data: _ups_order_settings_insert_input
  on_conflict?: InputMaybe<_ups_order_settings_on_conflict>
}

/** on conflict condition type for table "_ups_order_settings" */
export type _ups_order_settings_on_conflict = {
  constraint: _ups_order_settings_constraint
  update_columns: Array<_ups_order_settings_update_column>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** ordering options when selecting data from "_ups_order_settings" */
export type _ups_order_settings_order_by = {
  _user_persistent_state?: InputMaybe<_user_persistent_state_order_by>
  user_nickname?: InputMaybe<order_by>
}

/** select columns of table "_ups_order_settings" */
export type _ups_order_settings_select_column =
  /** column name */
  'user_nickname'

/** input type for updating data in table "_ups_order_settings" */
export type _ups_order_settings_set_input = {
  user_nickname?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "_ups_order_settings" */
export type _ups_order_settings_update_column =
  /** column name */
  'user_nickname'

/** columns and relationships of "_ups_report_settings" */
export type _ups_report_settings = {
  _envelop_address_window: Scalars['String']['output']
  _paper_size: Scalars['String']['output']
  _preset_name: Scalars['String']['output']
}

/** aggregated selection of "_ups_report_settings" */
export type _ups_report_settings_aggregate = {
  aggregate?: Maybe<_ups_report_settings_aggregate_fields>
  nodes: Array<_ups_report_settings>
}

/** aggregate fields of "_ups_report_settings" */
export type _ups_report_settings_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_ups_report_settings_max_fields>
  min?: Maybe<_ups_report_settings_min_fields>
}

/** aggregate fields of "_ups_report_settings" */
export type _ups_report_settings_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_ups_report_settings_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_ups_report_settings" */
export type _ups_report_settings_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_ups_report_settings_max_order_by>
  min?: InputMaybe<_ups_report_settings_min_order_by>
}

/** input type for inserting array relation for remote table "_ups_report_settings" */
export type _ups_report_settings_arr_rel_insert_input = {
  data: Array<_ups_report_settings_insert_input>
  on_conflict?: InputMaybe<_ups_report_settings_on_conflict>
}

/** Boolean expression to filter rows from the table "_ups_report_settings". All fields are combined with a logical 'AND'. */
export type _ups_report_settings_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_ups_report_settings_bool_exp>>>
  _envelop_address_window?: InputMaybe<String_comparison_exp>
  _not?: InputMaybe<_ups_report_settings_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_ups_report_settings_bool_exp>>>
  _paper_size?: InputMaybe<String_comparison_exp>
  _preset_name?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "_ups_report_settings" */
export type _ups_report_settings_constraint =
  /** unique or primary key constraint */
  '_ups_report_settings_pkey'

/** input type for inserting data into table "_ups_report_settings" */
export type _ups_report_settings_insert_input = {
  _envelop_address_window?: InputMaybe<Scalars['String']['input']>
  _paper_size?: InputMaybe<Scalars['String']['input']>
  _preset_name?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type _ups_report_settings_max_fields = {
  _envelop_address_window?: Maybe<Scalars['String']['output']>
  _paper_size?: Maybe<Scalars['String']['output']>
  _preset_name?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_ups_report_settings" */
export type _ups_report_settings_max_order_by = {
  _envelop_address_window?: InputMaybe<order_by>
  _paper_size?: InputMaybe<order_by>
  _preset_name?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _ups_report_settings_min_fields = {
  _envelop_address_window?: Maybe<Scalars['String']['output']>
  _paper_size?: Maybe<Scalars['String']['output']>
  _preset_name?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_ups_report_settings" */
export type _ups_report_settings_min_order_by = {
  _envelop_address_window?: InputMaybe<order_by>
  _paper_size?: InputMaybe<order_by>
  _preset_name?: InputMaybe<order_by>
}

/** response of any mutation on the table "_ups_report_settings" */
export type _ups_report_settings_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_ups_report_settings>
}

/** input type for inserting object relation for remote table "_ups_report_settings" */
export type _ups_report_settings_obj_rel_insert_input = {
  data: _ups_report_settings_insert_input
  on_conflict?: InputMaybe<_ups_report_settings_on_conflict>
}

/** on conflict condition type for table "_ups_report_settings" */
export type _ups_report_settings_on_conflict = {
  constraint: _ups_report_settings_constraint
  update_columns: Array<_ups_report_settings_update_column>
  where?: InputMaybe<_ups_report_settings_bool_exp>
}

/** ordering options when selecting data from "_ups_report_settings" */
export type _ups_report_settings_order_by = {
  _envelop_address_window?: InputMaybe<order_by>
  _paper_size?: InputMaybe<order_by>
  _preset_name?: InputMaybe<order_by>
}

/** select columns of table "_ups_report_settings" */
export type _ups_report_settings_select_column =
  /** column name */
  | '_envelop_address_window'
  /** column name */
  | '_paper_size'
  /** column name */
  | '_preset_name'

/** input type for updating data in table "_ups_report_settings" */
export type _ups_report_settings_set_input = {
  _envelop_address_window?: InputMaybe<Scalars['String']['input']>
  _paper_size?: InputMaybe<Scalars['String']['input']>
  _preset_name?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "_ups_report_settings" */
export type _ups_report_settings_update_column =
  /** column name */
  | '_envelop_address_window'
  /** column name */
  | '_paper_size'
  /** column name */
  | '_preset_name'

/** columns and relationships of "_user_persistent_state" */
export type _user_persistent_state = {
  /** An array relationship */
  _ups_order_settings: Array<_ups_order_settings>
  /** An aggregated array relationship */
  _ups_order_settings_aggregate: _ups_order_settings_aggregate
  /** An object relationship */
  company: companies
  is_user_active: Scalars['Boolean']['output']
  user_default_company: Scalars['String']['output']
  user_default_language: Scalars['String']['output']
  user_full_name: Scalars['String']['output']
  user_nickname: Scalars['String']['output']
}

/** columns and relationships of "_user_persistent_state" */
export type _user_persistent_state_ups_order_settingsArgs = {
  distinct_on?: InputMaybe<Array<_ups_order_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_order_settings_order_by>>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** columns and relationships of "_user_persistent_state" */
export type _user_persistent_state_ups_order_settings_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_ups_order_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_order_settings_order_by>>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** aggregated selection of "_user_persistent_state" */
export type _user_persistent_state_aggregate = {
  aggregate?: Maybe<_user_persistent_state_aggregate_fields>
  nodes: Array<_user_persistent_state>
}

/** aggregate fields of "_user_persistent_state" */
export type _user_persistent_state_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<_user_persistent_state_max_fields>
  min?: Maybe<_user_persistent_state_min_fields>
}

/** aggregate fields of "_user_persistent_state" */
export type _user_persistent_state_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<_user_persistent_state_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "_user_persistent_state" */
export type _user_persistent_state_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<_user_persistent_state_max_order_by>
  min?: InputMaybe<_user_persistent_state_min_order_by>
}

/** input type for inserting array relation for remote table "_user_persistent_state" */
export type _user_persistent_state_arr_rel_insert_input = {
  data: Array<_user_persistent_state_insert_input>
  on_conflict?: InputMaybe<_user_persistent_state_on_conflict>
}

/** Boolean expression to filter rows from the table "_user_persistent_state". All fields are combined with a logical 'AND'. */
export type _user_persistent_state_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<_user_persistent_state_bool_exp>>>
  _not?: InputMaybe<_user_persistent_state_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<_user_persistent_state_bool_exp>>>
  _ups_order_settings?: InputMaybe<_ups_order_settings_bool_exp>
  company?: InputMaybe<companies_bool_exp>
  is_user_active?: InputMaybe<Boolean_comparison_exp>
  user_default_company?: InputMaybe<String_comparison_exp>
  user_default_language?: InputMaybe<String_comparison_exp>
  user_full_name?: InputMaybe<String_comparison_exp>
  user_nickname?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "_user_persistent_state" */
export type _user_persistent_state_constraint =
  /** unique or primary key constraint */
  | '_user_persistent_state_pkey'
  /** unique or primary key constraint */
  | '_user_persistent_state_user_full_name_key'

/** input type for inserting data into table "_user_persistent_state" */
export type _user_persistent_state_insert_input = {
  _ups_order_settings?: InputMaybe<_ups_order_settings_arr_rel_insert_input>
  company?: InputMaybe<companies_obj_rel_insert_input>
  is_user_active?: InputMaybe<Scalars['Boolean']['input']>
  user_default_company?: InputMaybe<Scalars['String']['input']>
  user_default_language?: InputMaybe<Scalars['String']['input']>
  user_full_name?: InputMaybe<Scalars['String']['input']>
  user_nickname?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type _user_persistent_state_max_fields = {
  user_default_company?: Maybe<Scalars['String']['output']>
  user_default_language?: Maybe<Scalars['String']['output']>
  user_full_name?: Maybe<Scalars['String']['output']>
  user_nickname?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "_user_persistent_state" */
export type _user_persistent_state_max_order_by = {
  user_default_company?: InputMaybe<order_by>
  user_default_language?: InputMaybe<order_by>
  user_full_name?: InputMaybe<order_by>
  user_nickname?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type _user_persistent_state_min_fields = {
  user_default_company?: Maybe<Scalars['String']['output']>
  user_default_language?: Maybe<Scalars['String']['output']>
  user_full_name?: Maybe<Scalars['String']['output']>
  user_nickname?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "_user_persistent_state" */
export type _user_persistent_state_min_order_by = {
  user_default_company?: InputMaybe<order_by>
  user_default_language?: InputMaybe<order_by>
  user_full_name?: InputMaybe<order_by>
  user_nickname?: InputMaybe<order_by>
}

/** response of any mutation on the table "_user_persistent_state" */
export type _user_persistent_state_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<_user_persistent_state>
}

/** input type for inserting object relation for remote table "_user_persistent_state" */
export type _user_persistent_state_obj_rel_insert_input = {
  data: _user_persistent_state_insert_input
  on_conflict?: InputMaybe<_user_persistent_state_on_conflict>
}

/** on conflict condition type for table "_user_persistent_state" */
export type _user_persistent_state_on_conflict = {
  constraint: _user_persistent_state_constraint
  update_columns: Array<_user_persistent_state_update_column>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** ordering options when selecting data from "_user_persistent_state" */
export type _user_persistent_state_order_by = {
  _ups_order_settings_aggregate?: InputMaybe<_ups_order_settings_aggregate_order_by>
  company?: InputMaybe<companies_order_by>
  is_user_active?: InputMaybe<order_by>
  user_default_company?: InputMaybe<order_by>
  user_default_language?: InputMaybe<order_by>
  user_full_name?: InputMaybe<order_by>
  user_nickname?: InputMaybe<order_by>
}

/** select columns of table "_user_persistent_state" */
export type _user_persistent_state_select_column =
  /** column name */
  | 'is_user_active'
  /** column name */
  | 'user_default_company'
  /** column name */
  | 'user_default_language'
  /** column name */
  | 'user_full_name'
  /** column name */
  | 'user_nickname'

/** input type for updating data in table "_user_persistent_state" */
export type _user_persistent_state_set_input = {
  is_user_active?: InputMaybe<Scalars['Boolean']['input']>
  user_default_company?: InputMaybe<Scalars['String']['input']>
  user_default_language?: InputMaybe<Scalars['String']['input']>
  user_full_name?: InputMaybe<Scalars['String']['input']>
  user_nickname?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "_user_persistent_state" */
export type _user_persistent_state_update_column =
  /** column name */
  | 'is_user_active'
  /** column name */
  | 'user_default_company'
  /** column name */
  | 'user_default_language'
  /** column name */
  | 'user_full_name'
  /** column name */
  | 'user_nickname'

/** columns and relationships of "addresses" */
export type addresses = {
  /** An array relationship */
  _addresses_opening_times: Array<addresses_opening_times>
  /** An aggregated array relationship */
  _addresses_opening_times_aggregate: addresses_opening_times_aggregate
  /** An object relationship */
  _cities?: Maybe<addresses_cities>
  /** An array relationship */
  _dispatch_headers: Array<dispatch_headers>
  /** An aggregated array relationship */
  _dispatch_headers_aggregate: dispatch_headers_aggregate
  /** An array relationship */
  _invoices: Array<document_transactions>
  /** An aggregated array relationship */
  _invoices_aggregate: document_transactions_aggregate
  /** An object relationship */
  ad_ad_rel?: Maybe<addresses>
  address_id: Scalars['String']['output']
  address_nickname?: Maybe<Scalars['String']['output']>
  address_phone?: Maybe<Scalars['String']['output']>
  address_type: Scalars['String']['output']
  city: Scalars['String']['output']
  /** An object relationship */
  company: companies
  company_id: Scalars['String']['output']
  country?: Maybe<Scalars['String']['output']>
  /** An object relationship */
  customer: customers
  /** An array relationship */
  document_transactions: Array<document_transactions>
  /** An aggregated array relationship */
  document_transactions_aggregate: document_transactions_aggregate
  is_active: Scalars['Boolean']['output']
  is_on_daily_route_list?: Maybe<Scalars['Boolean']['output']>
  line_1: Scalars['String']['output']
  line_2?: Maybe<Scalars['String']['output']>
  list_group: Scalars['String']['output']
  open_hours?: Maybe<Scalars['String']['output']>
  order_clerk?: Maybe<Scalars['String']['output']>
  owner_id: Scalars['String']['output']
  post_code: Scalars['String']['output']
  route_id?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
}

/** columns and relationships of "addresses" */
export type addresses_addresses_opening_timesArgs = {
  distinct_on?: InputMaybe<Array<addresses_opening_times_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_opening_times_order_by>>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** columns and relationships of "addresses" */
export type addresses_addresses_opening_times_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_opening_times_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_opening_times_order_by>>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** columns and relationships of "addresses" */
export type addresses_dispatch_headersArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** columns and relationships of "addresses" */
export type addresses_dispatch_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** columns and relationships of "addresses" */
export type addresses_invoicesArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "addresses" */
export type addresses_invoices_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "addresses" */
export type addressesdocument_transactionsArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "addresses" */
export type addressesdocument_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** aggregated selection of "addresses" */
export type addresses_aggregate = {
  aggregate?: Maybe<addresses_aggregate_fields>
  nodes: Array<addresses>
}

/** aggregate fields of "addresses" */
export type addresses_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<addresses_max_fields>
  min?: Maybe<addresses_min_fields>
}

/** aggregate fields of "addresses" */
export type addresses_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<addresses_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "addresses" */
export type addresses_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<addresses_max_order_by>
  min?: InputMaybe<addresses_min_order_by>
}

/** input type for inserting array relation for remote table "addresses" */
export type addresses_arr_rel_insert_input = {
  data: Array<addresses_insert_input>
  on_conflict?: InputMaybe<addresses_on_conflict>
}

/** Boolean expression to filter rows from the table "addresses". All fields are combined with a logical 'AND'. */
export type addresses_bool_exp = {
  _addresses_opening_times?: InputMaybe<addresses_opening_times_bool_exp>
  _and?: InputMaybe<Array<InputMaybe<addresses_bool_exp>>>
  _cities?: InputMaybe<addresses_cities_bool_exp>
  _dispatch_headers?: InputMaybe<dispatch_headers_bool_exp>
  _invoices?: InputMaybe<document_transactions_bool_exp>
  _not?: InputMaybe<addresses_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<addresses_bool_exp>>>
  ad_ad_rel?: InputMaybe<addresses_bool_exp>
  address_id?: InputMaybe<String_comparison_exp>
  address_nickname?: InputMaybe<String_comparison_exp>
  address_phone?: InputMaybe<String_comparison_exp>
  address_type?: InputMaybe<String_comparison_exp>
  city?: InputMaybe<String_comparison_exp>
  company?: InputMaybe<companies_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  country?: InputMaybe<String_comparison_exp>
  customer?: InputMaybe<customers_bool_exp>
  document_transactions?: InputMaybe<document_transactions_bool_exp>
  is_active?: InputMaybe<Boolean_comparison_exp>
  is_on_daily_route_list?: InputMaybe<Boolean_comparison_exp>
  line_1?: InputMaybe<String_comparison_exp>
  line_2?: InputMaybe<String_comparison_exp>
  list_group?: InputMaybe<String_comparison_exp>
  open_hours?: InputMaybe<String_comparison_exp>
  order_clerk?: InputMaybe<String_comparison_exp>
  owner_id?: InputMaybe<String_comparison_exp>
  post_code?: InputMaybe<String_comparison_exp>
  route_id?: InputMaybe<String_comparison_exp>
  state?: InputMaybe<String_comparison_exp>
}

/** columns and relationships of "addresses_cities" */
export type addresses_cities = {
  /** An array relationship */
  _addresses: Array<addresses>
  /** An aggregated array relationship */
  _addresses_aggregate: addresses_aggregate
  /** An object relationship */
  _adresses_route: adresses_routes
  city_name: Scalars['String']['output']
  route_id_by_city: Scalars['String']['output']
}

/** columns and relationships of "addresses_cities" */
export type addresses_cities_addressesArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "addresses_cities" */
export type addresses_cities_addresses_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** aggregated selection of "addresses_cities" */
export type addresses_cities_aggregate = {
  aggregate?: Maybe<addresses_cities_aggregate_fields>
  nodes: Array<addresses_cities>
}

/** aggregate fields of "addresses_cities" */
export type addresses_cities_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<addresses_cities_max_fields>
  min?: Maybe<addresses_cities_min_fields>
}

/** aggregate fields of "addresses_cities" */
export type addresses_cities_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<addresses_cities_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "addresses_cities" */
export type addresses_cities_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<addresses_cities_max_order_by>
  min?: InputMaybe<addresses_cities_min_order_by>
}

/** input type for inserting array relation for remote table "addresses_cities" */
export type addresses_cities_arr_rel_insert_input = {
  data: Array<addresses_cities_insert_input>
  on_conflict?: InputMaybe<addresses_cities_on_conflict>
}

/** Boolean expression to filter rows from the table "addresses_cities". All fields are combined with a logical 'AND'. */
export type addresses_cities_bool_exp = {
  _addresses?: InputMaybe<addresses_bool_exp>
  _adresses_route?: InputMaybe<adresses_routes_bool_exp>
  _and?: InputMaybe<Array<InputMaybe<addresses_cities_bool_exp>>>
  _not?: InputMaybe<addresses_cities_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<addresses_cities_bool_exp>>>
  city_name?: InputMaybe<String_comparison_exp>
  route_id_by_city?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "addresses_cities" */
export type addresses_cities_constraint =
  /** unique or primary key constraint */
  'addresses_cities_pkey'

/** input type for inserting data into table "addresses_cities" */
export type addresses_cities_insert_input = {
  _addresses?: InputMaybe<addresses_arr_rel_insert_input>
  _adresses_route?: InputMaybe<adresses_routes_obj_rel_insert_input>
  city_name?: InputMaybe<Scalars['String']['input']>
  route_id_by_city?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type addresses_cities_max_fields = {
  city_name?: Maybe<Scalars['String']['output']>
  route_id_by_city?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "addresses_cities" */
export type addresses_cities_max_order_by = {
  city_name?: InputMaybe<order_by>
  route_id_by_city?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type addresses_cities_min_fields = {
  city_name?: Maybe<Scalars['String']['output']>
  route_id_by_city?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "addresses_cities" */
export type addresses_cities_min_order_by = {
  city_name?: InputMaybe<order_by>
  route_id_by_city?: InputMaybe<order_by>
}

/** response of any mutation on the table "addresses_cities" */
export type addresses_cities_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<addresses_cities>
}

/** input type for inserting object relation for remote table "addresses_cities" */
export type addresses_cities_obj_rel_insert_input = {
  data: addresses_cities_insert_input
  on_conflict?: InputMaybe<addresses_cities_on_conflict>
}

/** on conflict condition type for table "addresses_cities" */
export type addresses_cities_on_conflict = {
  constraint: addresses_cities_constraint
  update_columns: Array<addresses_cities_update_column>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** ordering options when selecting data from "addresses_cities" */
export type addresses_cities_order_by = {
  _addresses_aggregate?: InputMaybe<addresses_aggregate_order_by>
  _adresses_route?: InputMaybe<adresses_routes_order_by>
  city_name?: InputMaybe<order_by>
  route_id_by_city?: InputMaybe<order_by>
}

/** select columns of table "addresses_cities" */
export type addresses_cities_select_column =
  /** column name */
  | 'city_name'
  /** column name */
  | 'route_id_by_city'

/** input type for updating data in table "addresses_cities" */
export type addresses_cities_set_input = {
  city_name?: InputMaybe<Scalars['String']['input']>
  route_id_by_city?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "addresses_cities" */
export type addresses_cities_update_column =
  /** column name */
  | 'city_name'
  /** column name */
  | 'route_id_by_city'

/** unique or primary key constraints on table "addresses" */
export type addresses_constraint =
  /** unique or primary key constraint */
  'addresses_pkey'

/** input type for inserting data into table "addresses" */
export type addresses_insert_input = {
  _addresses_opening_times?: InputMaybe<addresses_opening_times_arr_rel_insert_input>
  _cities?: InputMaybe<addresses_cities_obj_rel_insert_input>
  _dispatch_headers?: InputMaybe<dispatch_headers_arr_rel_insert_input>
  _invoices?: InputMaybe<document_transactions_arr_rel_insert_input>
  ad_ad_rel?: InputMaybe<addresses_obj_rel_insert_input>
  address_id?: InputMaybe<Scalars['String']['input']>
  address_nickname?: InputMaybe<Scalars['String']['input']>
  address_phone?: InputMaybe<Scalars['String']['input']>
  address_type?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  country?: InputMaybe<Scalars['String']['input']>
  customer?: InputMaybe<customers_obj_rel_insert_input>
  document_transactions?: InputMaybe<document_transactions_arr_rel_insert_input>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  is_on_daily_route_list?: InputMaybe<Scalars['Boolean']['input']>
  line_1?: InputMaybe<Scalars['String']['input']>
  line_2?: InputMaybe<Scalars['String']['input']>
  list_group?: InputMaybe<Scalars['String']['input']>
  open_hours?: InputMaybe<Scalars['String']['input']>
  order_clerk?: InputMaybe<Scalars['String']['input']>
  owner_id?: InputMaybe<Scalars['String']['input']>
  post_code?: InputMaybe<Scalars['String']['input']>
  route_id?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type addresses_max_fields = {
  address_id?: Maybe<Scalars['String']['output']>
  address_nickname?: Maybe<Scalars['String']['output']>
  address_phone?: Maybe<Scalars['String']['output']>
  address_type?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  company_id?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  line_1?: Maybe<Scalars['String']['output']>
  line_2?: Maybe<Scalars['String']['output']>
  list_group?: Maybe<Scalars['String']['output']>
  open_hours?: Maybe<Scalars['String']['output']>
  order_clerk?: Maybe<Scalars['String']['output']>
  owner_id?: Maybe<Scalars['String']['output']>
  post_code?: Maybe<Scalars['String']['output']>
  route_id?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "addresses" */
export type addresses_max_order_by = {
  address_id?: InputMaybe<order_by>
  address_nickname?: InputMaybe<order_by>
  address_phone?: InputMaybe<order_by>
  address_type?: InputMaybe<order_by>
  city?: InputMaybe<order_by>
  company_id?: InputMaybe<order_by>
  country?: InputMaybe<order_by>
  line_1?: InputMaybe<order_by>
  line_2?: InputMaybe<order_by>
  list_group?: InputMaybe<order_by>
  open_hours?: InputMaybe<order_by>
  order_clerk?: InputMaybe<order_by>
  owner_id?: InputMaybe<order_by>
  post_code?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  state?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type addresses_min_fields = {
  address_id?: Maybe<Scalars['String']['output']>
  address_nickname?: Maybe<Scalars['String']['output']>
  address_phone?: Maybe<Scalars['String']['output']>
  address_type?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  company_id?: Maybe<Scalars['String']['output']>
  country?: Maybe<Scalars['String']['output']>
  line_1?: Maybe<Scalars['String']['output']>
  line_2?: Maybe<Scalars['String']['output']>
  list_group?: Maybe<Scalars['String']['output']>
  open_hours?: Maybe<Scalars['String']['output']>
  order_clerk?: Maybe<Scalars['String']['output']>
  owner_id?: Maybe<Scalars['String']['output']>
  post_code?: Maybe<Scalars['String']['output']>
  route_id?: Maybe<Scalars['String']['output']>
  state?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "addresses" */
export type addresses_min_order_by = {
  address_id?: InputMaybe<order_by>
  address_nickname?: InputMaybe<order_by>
  address_phone?: InputMaybe<order_by>
  address_type?: InputMaybe<order_by>
  city?: InputMaybe<order_by>
  company_id?: InputMaybe<order_by>
  country?: InputMaybe<order_by>
  line_1?: InputMaybe<order_by>
  line_2?: InputMaybe<order_by>
  list_group?: InputMaybe<order_by>
  open_hours?: InputMaybe<order_by>
  order_clerk?: InputMaybe<order_by>
  owner_id?: InputMaybe<order_by>
  post_code?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  state?: InputMaybe<order_by>
}

/** response of any mutation on the table "addresses" */
export type addresses_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<addresses>
}

/** input type for inserting object relation for remote table "addresses" */
export type addresses_obj_rel_insert_input = {
  data: addresses_insert_input
  on_conflict?: InputMaybe<addresses_on_conflict>
}

/** on conflict condition type for table "addresses" */
export type addresses_on_conflict = {
  constraint: addresses_constraint
  update_columns: Array<addresses_update_column>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "addresses_opening_times" */
export type addresses_opening_times = {
  /** An object relationship */
  _addresses?: Maybe<addresses>
  address_id: Scalars['Int']['output']
  day_of_week: Scalars['Int']['output']
  is_open: Scalars['Boolean']['output']
  opening_time: Scalars['timetz']['output']
}

/** aggregated selection of "addresses_opening_times" */
export type addresses_opening_times_aggregate = {
  aggregate?: Maybe<addresses_opening_times_aggregate_fields>
  nodes: Array<addresses_opening_times>
}

/** aggregate fields of "addresses_opening_times" */
export type addresses_opening_times_aggregate_fields = {
  avg?: Maybe<addresses_opening_times_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<addresses_opening_times_max_fields>
  min?: Maybe<addresses_opening_times_min_fields>
  stddev?: Maybe<addresses_opening_times_stddev_fields>
  stddev_pop?: Maybe<addresses_opening_times_stddev_pop_fields>
  stddev_samp?: Maybe<addresses_opening_times_stddev_samp_fields>
  sum?: Maybe<addresses_opening_times_sum_fields>
  var_pop?: Maybe<addresses_opening_times_var_pop_fields>
  var_samp?: Maybe<addresses_opening_times_var_samp_fields>
  variance?: Maybe<addresses_opening_times_variance_fields>
}

/** aggregate fields of "addresses_opening_times" */
export type addresses_opening_times_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<addresses_opening_times_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "addresses_opening_times" */
export type addresses_opening_times_aggregate_order_by = {
  avg?: InputMaybe<addresses_opening_times_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<addresses_opening_times_max_order_by>
  min?: InputMaybe<addresses_opening_times_min_order_by>
  stddev?: InputMaybe<addresses_opening_times_stddev_order_by>
  stddev_pop?: InputMaybe<addresses_opening_times_stddev_pop_order_by>
  stddev_samp?: InputMaybe<addresses_opening_times_stddev_samp_order_by>
  sum?: InputMaybe<addresses_opening_times_sum_order_by>
  var_pop?: InputMaybe<addresses_opening_times_var_pop_order_by>
  var_samp?: InputMaybe<addresses_opening_times_var_samp_order_by>
  variance?: InputMaybe<addresses_opening_times_variance_order_by>
}

/** input type for inserting array relation for remote table "addresses_opening_times" */
export type addresses_opening_times_arr_rel_insert_input = {
  data: Array<addresses_opening_times_insert_input>
  on_conflict?: InputMaybe<addresses_opening_times_on_conflict>
}

/** aggregate avg on columns */
export type addresses_opening_times_avg_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "addresses_opening_times" */
export type addresses_opening_times_avg_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "addresses_opening_times". All fields are combined with a logical 'AND'. */
export type addresses_opening_times_bool_exp = {
  _addresses?: InputMaybe<addresses_bool_exp>
  _and?: InputMaybe<Array<InputMaybe<addresses_opening_times_bool_exp>>>
  _not?: InputMaybe<addresses_opening_times_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<addresses_opening_times_bool_exp>>>
  address_id?: InputMaybe<Int_comparison_exp>
  day_of_week?: InputMaybe<Int_comparison_exp>
  is_open?: InputMaybe<Boolean_comparison_exp>
  opening_time?: InputMaybe<timetz_comparison_exp>
}

/** unique or primary key constraints on table "addresses_opening_times" */
export type addresses_opening_times_constraint =
  /** unique or primary key constraint */
  'addresses_opening_times_pkey'

/** input type for incrementing integer columne in table "addresses_opening_times" */
export type addresses_opening_times_inc_input = {
  address_id?: InputMaybe<Scalars['Int']['input']>
  day_of_week?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "addresses_opening_times" */
export type addresses_opening_times_insert_input = {
  _addresses?: InputMaybe<addresses_obj_rel_insert_input>
  address_id?: InputMaybe<Scalars['Int']['input']>
  day_of_week?: InputMaybe<Scalars['Int']['input']>
  is_open?: InputMaybe<Scalars['Boolean']['input']>
  opening_time?: InputMaybe<Scalars['timetz']['input']>
}

/** aggregate max on columns */
export type addresses_opening_times_max_fields = {
  address_id?: Maybe<Scalars['Int']['output']>
  day_of_week?: Maybe<Scalars['Int']['output']>
  opening_time?: Maybe<Scalars['timetz']['output']>
}

/** order by max() on columns of table "addresses_opening_times" */
export type addresses_opening_times_max_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
  opening_time?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type addresses_opening_times_min_fields = {
  address_id?: Maybe<Scalars['Int']['output']>
  day_of_week?: Maybe<Scalars['Int']['output']>
  opening_time?: Maybe<Scalars['timetz']['output']>
}

/** order by min() on columns of table "addresses_opening_times" */
export type addresses_opening_times_min_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
  opening_time?: InputMaybe<order_by>
}

/** response of any mutation on the table "addresses_opening_times" */
export type addresses_opening_times_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<addresses_opening_times>
}

/** input type for inserting object relation for remote table "addresses_opening_times" */
export type addresses_opening_times_obj_rel_insert_input = {
  data: addresses_opening_times_insert_input
  on_conflict?: InputMaybe<addresses_opening_times_on_conflict>
}

/** on conflict condition type for table "addresses_opening_times" */
export type addresses_opening_times_on_conflict = {
  constraint: addresses_opening_times_constraint
  update_columns: Array<addresses_opening_times_update_column>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** ordering options when selecting data from "addresses_opening_times" */
export type addresses_opening_times_order_by = {
  _addresses?: InputMaybe<addresses_order_by>
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
  is_open?: InputMaybe<order_by>
  opening_time?: InputMaybe<order_by>
}

/** select columns of table "addresses_opening_times" */
export type addresses_opening_times_select_column =
  /** column name */
  | 'address_id'
  /** column name */
  | 'day_of_week'
  /** column name */
  | 'is_open'
  /** column name */
  | 'opening_time'

/** input type for updating data in table "addresses_opening_times" */
export type addresses_opening_times_set_input = {
  address_id?: InputMaybe<Scalars['Int']['input']>
  day_of_week?: InputMaybe<Scalars['Int']['input']>
  is_open?: InputMaybe<Scalars['Boolean']['input']>
  opening_time?: InputMaybe<Scalars['timetz']['input']>
}

/** aggregate stddev on columns */
export type addresses_opening_times_stddev_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "addresses_opening_times" */
export type addresses_opening_times_stddev_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type addresses_opening_times_stddev_pop_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "addresses_opening_times" */
export type addresses_opening_times_stddev_pop_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type addresses_opening_times_stddev_samp_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "addresses_opening_times" */
export type addresses_opening_times_stddev_samp_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type addresses_opening_times_sum_fields = {
  address_id?: Maybe<Scalars['Int']['output']>
  day_of_week?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "addresses_opening_times" */
export type addresses_opening_times_sum_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** update columns of table "addresses_opening_times" */
export type addresses_opening_times_update_column =
  /** column name */
  | 'address_id'
  /** column name */
  | 'day_of_week'
  /** column name */
  | 'is_open'
  /** column name */
  | 'opening_time'

/** aggregate var_pop on columns */
export type addresses_opening_times_var_pop_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "addresses_opening_times" */
export type addresses_opening_times_var_pop_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type addresses_opening_times_var_samp_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "addresses_opening_times" */
export type addresses_opening_times_var_samp_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type addresses_opening_times_variance_fields = {
  address_id?: Maybe<Scalars['Float']['output']>
  day_of_week?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "addresses_opening_times" */
export type addresses_opening_times_variance_order_by = {
  address_id?: InputMaybe<order_by>
  day_of_week?: InputMaybe<order_by>
}

/** ordering options when selecting data from "addresses" */
export type addresses_order_by = {
  _addresses_opening_times_aggregate?: InputMaybe<addresses_opening_times_aggregate_order_by>
  _cities?: InputMaybe<addresses_cities_order_by>
  _dispatch_headers_aggregate?: InputMaybe<dispatch_headers_aggregate_order_by>
  _invoices_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  ad_ad_rel?: InputMaybe<addresses_order_by>
  address_id?: InputMaybe<order_by>
  address_nickname?: InputMaybe<order_by>
  address_phone?: InputMaybe<order_by>
  address_type?: InputMaybe<order_by>
  city?: InputMaybe<order_by>
  company?: InputMaybe<companies_order_by>
  company_id?: InputMaybe<order_by>
  country?: InputMaybe<order_by>
  customer?: InputMaybe<customers_order_by>
  document_transactions_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  is_active?: InputMaybe<order_by>
  is_on_daily_route_list?: InputMaybe<order_by>
  line_1?: InputMaybe<order_by>
  line_2?: InputMaybe<order_by>
  list_group?: InputMaybe<order_by>
  open_hours?: InputMaybe<order_by>
  order_clerk?: InputMaybe<order_by>
  owner_id?: InputMaybe<order_by>
  post_code?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  state?: InputMaybe<order_by>
}

/** select columns of table "addresses" */
export type addresses_select_column =
  /** column name */
  | 'address_id'
  /** column name */
  | 'address_nickname'
  /** column name */
  | 'address_phone'
  /** column name */
  | 'address_type'
  /** column name */
  | 'city'
  /** column name */
  | 'company_id'
  /** column name */
  | 'country'
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_on_daily_route_list'
  /** column name */
  | 'line_1'
  /** column name */
  | 'line_2'
  /** column name */
  | 'list_group'
  /** column name */
  | 'open_hours'
  /** column name */
  | 'order_clerk'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'post_code'
  /** column name */
  | 'route_id'
  /** column name */
  | 'state'

/** input type for updating data in table "addresses" */
export type addresses_set_input = {
  address_id?: InputMaybe<Scalars['String']['input']>
  address_nickname?: InputMaybe<Scalars['String']['input']>
  address_phone?: InputMaybe<Scalars['String']['input']>
  address_type?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  company_id?: InputMaybe<Scalars['String']['input']>
  country?: InputMaybe<Scalars['String']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  is_on_daily_route_list?: InputMaybe<Scalars['Boolean']['input']>
  line_1?: InputMaybe<Scalars['String']['input']>
  line_2?: InputMaybe<Scalars['String']['input']>
  list_group?: InputMaybe<Scalars['String']['input']>
  open_hours?: InputMaybe<Scalars['String']['input']>
  order_clerk?: InputMaybe<Scalars['String']['input']>
  owner_id?: InputMaybe<Scalars['String']['input']>
  post_code?: InputMaybe<Scalars['String']['input']>
  route_id?: InputMaybe<Scalars['String']['input']>
  state?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "addresses" */
export type addresses_update_column =
  /** column name */
  | 'address_id'
  /** column name */
  | 'address_nickname'
  /** column name */
  | 'address_phone'
  /** column name */
  | 'address_type'
  /** column name */
  | 'city'
  /** column name */
  | 'company_id'
  /** column name */
  | 'country'
  /** column name */
  | 'is_active'
  /** column name */
  | 'is_on_daily_route_list'
  /** column name */
  | 'line_1'
  /** column name */
  | 'line_2'
  /** column name */
  | 'list_group'
  /** column name */
  | 'open_hours'
  /** column name */
  | 'order_clerk'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'post_code'
  /** column name */
  | 'route_id'
  /** column name */
  | 'state'

/** columns and relationships of "adresses_routes" */
export type adresses_routes = {
  /** An array relationship */
  addresses_cities: Array<addresses_cities>
  /** An aggregated array relationship */
  addresses_cities_aggregate: addresses_cities_aggregate
  dayOfWeek: Scalars['Int']['output']
  route_id: Scalars['String']['output']
  route_name: Scalars['String']['output']
}

/** columns and relationships of "adresses_routes" */
export type adresses_routesaddresses_citiesArgs = {
  distinct_on?: InputMaybe<Array<addresses_cities_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_cities_order_by>>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** columns and relationships of "adresses_routes" */
export type adresses_routesaddresses_cities_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_cities_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_cities_order_by>>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** aggregated selection of "adresses_routes" */
export type adresses_routes_aggregate = {
  aggregate?: Maybe<adresses_routes_aggregate_fields>
  nodes: Array<adresses_routes>
}

/** aggregate fields of "adresses_routes" */
export type adresses_routes_aggregate_fields = {
  avg?: Maybe<adresses_routes_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<adresses_routes_max_fields>
  min?: Maybe<adresses_routes_min_fields>
  stddev?: Maybe<adresses_routes_stddev_fields>
  stddev_pop?: Maybe<adresses_routes_stddev_pop_fields>
  stddev_samp?: Maybe<adresses_routes_stddev_samp_fields>
  sum?: Maybe<adresses_routes_sum_fields>
  var_pop?: Maybe<adresses_routes_var_pop_fields>
  var_samp?: Maybe<adresses_routes_var_samp_fields>
  variance?: Maybe<adresses_routes_variance_fields>
}

/** aggregate fields of "adresses_routes" */
export type adresses_routes_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<adresses_routes_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "adresses_routes" */
export type adresses_routes_aggregate_order_by = {
  avg?: InputMaybe<adresses_routes_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<adresses_routes_max_order_by>
  min?: InputMaybe<adresses_routes_min_order_by>
  stddev?: InputMaybe<adresses_routes_stddev_order_by>
  stddev_pop?: InputMaybe<adresses_routes_stddev_pop_order_by>
  stddev_samp?: InputMaybe<adresses_routes_stddev_samp_order_by>
  sum?: InputMaybe<adresses_routes_sum_order_by>
  var_pop?: InputMaybe<adresses_routes_var_pop_order_by>
  var_samp?: InputMaybe<adresses_routes_var_samp_order_by>
  variance?: InputMaybe<adresses_routes_variance_order_by>
}

/** input type for inserting array relation for remote table "adresses_routes" */
export type adresses_routes_arr_rel_insert_input = {
  data: Array<adresses_routes_insert_input>
  on_conflict?: InputMaybe<adresses_routes_on_conflict>
}

/** aggregate avg on columns */
export type adresses_routes_avg_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "adresses_routes" */
export type adresses_routes_avg_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "adresses_routes". All fields are combined with a logical 'AND'. */
export type adresses_routes_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<adresses_routes_bool_exp>>>
  _not?: InputMaybe<adresses_routes_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<adresses_routes_bool_exp>>>
  addresses_cities?: InputMaybe<addresses_cities_bool_exp>
  dayOfWeek?: InputMaybe<Int_comparison_exp>
  route_id?: InputMaybe<String_comparison_exp>
  route_name?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "adresses_routes" */
export type adresses_routes_constraint =
  /** unique or primary key constraint */
  'adresses_routes_pkey'

/** input type for incrementing integer columne in table "adresses_routes" */
export type adresses_routes_inc_input = {
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "adresses_routes" */
export type adresses_routes_insert_input = {
  addresses_cities?: InputMaybe<addresses_cities_arr_rel_insert_input>
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>
  route_id?: InputMaybe<Scalars['String']['input']>
  route_name?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type adresses_routes_max_fields = {
  dayOfWeek?: Maybe<Scalars['Int']['output']>
  route_id?: Maybe<Scalars['String']['output']>
  route_name?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "adresses_routes" */
export type adresses_routes_max_order_by = {
  dayOfWeek?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  route_name?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type adresses_routes_min_fields = {
  dayOfWeek?: Maybe<Scalars['Int']['output']>
  route_id?: Maybe<Scalars['String']['output']>
  route_name?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "adresses_routes" */
export type adresses_routes_min_order_by = {
  dayOfWeek?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  route_name?: InputMaybe<order_by>
}

/** response of any mutation on the table "adresses_routes" */
export type adresses_routes_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<adresses_routes>
}

/** input type for inserting object relation for remote table "adresses_routes" */
export type adresses_routes_obj_rel_insert_input = {
  data: adresses_routes_insert_input
  on_conflict?: InputMaybe<adresses_routes_on_conflict>
}

/** on conflict condition type for table "adresses_routes" */
export type adresses_routes_on_conflict = {
  constraint: adresses_routes_constraint
  update_columns: Array<adresses_routes_update_column>
  where?: InputMaybe<adresses_routes_bool_exp>
}

/** ordering options when selecting data from "adresses_routes" */
export type adresses_routes_order_by = {
  addresses_cities_aggregate?: InputMaybe<addresses_cities_aggregate_order_by>
  dayOfWeek?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  route_name?: InputMaybe<order_by>
}

/** select columns of table "adresses_routes" */
export type adresses_routes_select_column =
  /** column name */
  | 'dayOfWeek'
  /** column name */
  | 'route_id'
  /** column name */
  | 'route_name'

/** input type for updating data in table "adresses_routes" */
export type adresses_routes_set_input = {
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>
  route_id?: InputMaybe<Scalars['String']['input']>
  route_name?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type adresses_routes_stddev_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "adresses_routes" */
export type adresses_routes_stddev_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type adresses_routes_stddev_pop_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "adresses_routes" */
export type adresses_routes_stddev_pop_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type adresses_routes_stddev_samp_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "adresses_routes" */
export type adresses_routes_stddev_samp_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type adresses_routes_sum_fields = {
  dayOfWeek?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "adresses_routes" */
export type adresses_routes_sum_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** update columns of table "adresses_routes" */
export type adresses_routes_update_column =
  /** column name */
  | 'dayOfWeek'
  /** column name */
  | 'route_id'
  /** column name */
  | 'route_name'

/** aggregate var_pop on columns */
export type adresses_routes_var_pop_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "adresses_routes" */
export type adresses_routes_var_pop_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type adresses_routes_var_samp_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "adresses_routes" */
export type adresses_routes_var_samp_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type adresses_routes_variance_fields = {
  dayOfWeek?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "adresses_routes" */
export type adresses_routes_variance_order_by = {
  dayOfWeek?: InputMaybe<order_by>
}

/** columns and relationships of "bank_accounts" */
export type bank_accounts = {
  bank_account_id: Scalars['uuid']['output']
}

/** aggregated selection of "bank_accounts" */
export type bank_accounts_aggregate = {
  aggregate?: Maybe<bank_accounts_aggregate_fields>
  nodes: Array<bank_accounts>
}

/** aggregate fields of "bank_accounts" */
export type bank_accounts_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
}

/** aggregate fields of "bank_accounts" */
export type bank_accounts_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<bank_accounts_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "bank_accounts" */
export type bank_accounts_aggregate_order_by = {
  count?: InputMaybe<order_by>
}

/** input type for inserting array relation for remote table "bank_accounts" */
export type bank_accounts_arr_rel_insert_input = {
  data: Array<bank_accounts_insert_input>
  on_conflict?: InputMaybe<bank_accounts_on_conflict>
}

/** Boolean expression to filter rows from the table "bank_accounts". All fields are combined with a logical 'AND'. */
export type bank_accounts_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<bank_accounts_bool_exp>>>
  _not?: InputMaybe<bank_accounts_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<bank_accounts_bool_exp>>>
  bank_account_id?: InputMaybe<uuid_comparison_exp>
}

/** unique or primary key constraints on table "bank_accounts" */
export type bank_accounts_constraint =
  /** unique or primary key constraint */
  'bank_accounts_pkey'

/** input type for inserting data into table "bank_accounts" */
export type bank_accounts_insert_input = {
  bank_account_id?: InputMaybe<Scalars['uuid']['input']>
}

/** response of any mutation on the table "bank_accounts" */
export type bank_accounts_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<bank_accounts>
}

/** input type for inserting object relation for remote table "bank_accounts" */
export type bank_accounts_obj_rel_insert_input = {
  data: bank_accounts_insert_input
  on_conflict?: InputMaybe<bank_accounts_on_conflict>
}

/** on conflict condition type for table "bank_accounts" */
export type bank_accounts_on_conflict = {
  constraint: bank_accounts_constraint
  update_columns: Array<bank_accounts_update_column>
  where?: InputMaybe<bank_accounts_bool_exp>
}

/** ordering options when selecting data from "bank_accounts" */
export type bank_accounts_order_by = {
  bank_account_id?: InputMaybe<order_by>
}

/** select columns of table "bank_accounts" */
export type bank_accounts_select_column =
  /** column name */
  'bank_account_id'

/** input type for updating data in table "bank_accounts" */
export type bank_accounts_set_input = {
  bank_account_id?: InputMaybe<Scalars['uuid']['input']>
}

/** update columns of table "bank_accounts" */
export type bank_accounts_update_column =
  /** column name */
  'bank_account_id'

/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type bigint_comparison_exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>
  _gt?: InputMaybe<Scalars['bigint']['input']>
  _gte?: InputMaybe<Scalars['bigint']['input']>
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['bigint']['input']>
  _lte?: InputMaybe<Scalars['bigint']['input']>
  _neq?: InputMaybe<Scalars['bigint']['input']>
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>
}

/** columns and relationships of "book_keep_headers" */
export type book_keep_headers = {
  book_keep_date: Scalars['date']['output']
  /** An array relationship */
  book_keep_headers_book_keep_lines_rel: Array<book_keep_lines>
  /** An aggregated array relationship */
  book_keep_headers_book_keep_lines_rel_aggregate: book_keep_lines_aggregate
  book_keep_id: Scalars['String']['output']
  customer_or_supplier_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_title?: Maybe<Scalars['String']['output']>
  document_number?: Maybe<Scalars['String']['output']>
  exchange_rate: Scalars['numeric']['output']
  exchange_unit: Scalars['String']['output']
  is_book_header_reported: Scalars['Boolean']['output']
  our_company: Scalars['String']['output']
  payment_credit_amount?: Maybe<Scalars['Int']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
  que_number: Scalars['Int']['output']
  report_number?: Maybe<Scalars['Int']['output']>
  report_type: Scalars['String']['output']
  transaction_type: Scalars['String']['output']
}

/** columns and relationships of "book_keep_headers" */
export type book_keep_headersbook_keep_headers_book_keep_lines_relArgs = {
  distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_lines_order_by>>
  where?: InputMaybe<book_keep_lines_bool_exp>
}

/** columns and relationships of "book_keep_headers" */
export type book_keep_headersbook_keep_headers_book_keep_lines_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<book_keep_lines_order_by>>
    where?: InputMaybe<book_keep_lines_bool_exp>
  }

/** aggregated selection of "book_keep_headers" */
export type book_keep_headers_aggregate = {
  aggregate?: Maybe<book_keep_headers_aggregate_fields>
  nodes: Array<book_keep_headers>
}

/** aggregate fields of "book_keep_headers" */
export type book_keep_headers_aggregate_fields = {
  avg?: Maybe<book_keep_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<book_keep_headers_max_fields>
  min?: Maybe<book_keep_headers_min_fields>
  stddev?: Maybe<book_keep_headers_stddev_fields>
  stddev_pop?: Maybe<book_keep_headers_stddev_pop_fields>
  stddev_samp?: Maybe<book_keep_headers_stddev_samp_fields>
  sum?: Maybe<book_keep_headers_sum_fields>
  var_pop?: Maybe<book_keep_headers_var_pop_fields>
  var_samp?: Maybe<book_keep_headers_var_samp_fields>
  variance?: Maybe<book_keep_headers_variance_fields>
}

/** aggregate fields of "book_keep_headers" */
export type book_keep_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<book_keep_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "book_keep_headers" */
export type book_keep_headers_aggregate_order_by = {
  avg?: InputMaybe<book_keep_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<book_keep_headers_max_order_by>
  min?: InputMaybe<book_keep_headers_min_order_by>
  stddev?: InputMaybe<book_keep_headers_stddev_order_by>
  stddev_pop?: InputMaybe<book_keep_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<book_keep_headers_stddev_samp_order_by>
  sum?: InputMaybe<book_keep_headers_sum_order_by>
  var_pop?: InputMaybe<book_keep_headers_var_pop_order_by>
  var_samp?: InputMaybe<book_keep_headers_var_samp_order_by>
  variance?: InputMaybe<book_keep_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "book_keep_headers" */
export type book_keep_headers_arr_rel_insert_input = {
  data: Array<book_keep_headers_insert_input>
  on_conflict?: InputMaybe<book_keep_headers_on_conflict>
}

/** aggregate avg on columns */
export type book_keep_headers_avg_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "book_keep_headers" */
export type book_keep_headers_avg_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "book_keep_headers". All fields are combined with a logical 'AND'. */
export type book_keep_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<book_keep_headers_bool_exp>>>
  _not?: InputMaybe<book_keep_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<book_keep_headers_bool_exp>>>
  book_keep_date?: InputMaybe<date_comparison_exp>
  book_keep_headers_book_keep_lines_rel?: InputMaybe<book_keep_lines_bool_exp>
  book_keep_id?: InputMaybe<String_comparison_exp>
  customer_or_supplier_id?: InputMaybe<String_comparison_exp>
  customer_or_supplier_title?: InputMaybe<String_comparison_exp>
  document_number?: InputMaybe<String_comparison_exp>
  exchange_rate?: InputMaybe<numeric_comparison_exp>
  exchange_unit?: InputMaybe<String_comparison_exp>
  is_book_header_reported?: InputMaybe<Boolean_comparison_exp>
  our_company?: InputMaybe<String_comparison_exp>
  payment_credit_amount?: InputMaybe<Int_comparison_exp>
  payment_credit_exchange_amount?: InputMaybe<Int_comparison_exp>
  payment_debit_amount?: InputMaybe<Int_comparison_exp>
  payment_debit_exchange_amount?: InputMaybe<Int_comparison_exp>
  payment_id?: InputMaybe<Int_comparison_exp>
  que_number?: InputMaybe<Int_comparison_exp>
  report_number?: InputMaybe<Int_comparison_exp>
  report_type?: InputMaybe<String_comparison_exp>
  transaction_type?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "book_keep_headers" */
export type book_keep_headers_constraint =
  /** unique or primary key constraint */
  | 'accounting_acc_trans_id_key'
  /** unique or primary key constraint */
  | 'accounting_pkey'

/** input type for incrementing integer columne in table "book_keep_headers" */
export type book_keep_headers_inc_input = {
  payment_credit_amount?: InputMaybe<Scalars['Int']['input']>
  payment_credit_exchange_amount?: InputMaybe<Scalars['Int']['input']>
  payment_debit_amount?: InputMaybe<Scalars['Int']['input']>
  payment_debit_exchange_amount?: InputMaybe<Scalars['Int']['input']>
  payment_id?: InputMaybe<Scalars['Int']['input']>
  que_number?: InputMaybe<Scalars['Int']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "book_keep_headers" */
export type book_keep_headers_insert_input = {
  book_keep_date?: InputMaybe<Scalars['date']['input']>
  book_keep_headers_book_keep_lines_rel?: InputMaybe<book_keep_lines_arr_rel_insert_input>
  book_keep_id?: InputMaybe<Scalars['String']['input']>
  customer_or_supplier_id?: InputMaybe<Scalars['String']['input']>
  customer_or_supplier_title?: InputMaybe<Scalars['String']['input']>
  document_number?: InputMaybe<Scalars['String']['input']>
  exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  exchange_unit?: InputMaybe<Scalars['String']['input']>
  is_book_header_reported?: InputMaybe<Scalars['Boolean']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  payment_credit_amount?: InputMaybe<Scalars['Int']['input']>
  payment_credit_exchange_amount?: InputMaybe<Scalars['Int']['input']>
  payment_debit_amount?: InputMaybe<Scalars['Int']['input']>
  payment_debit_exchange_amount?: InputMaybe<Scalars['Int']['input']>
  payment_id?: InputMaybe<Scalars['Int']['input']>
  que_number?: InputMaybe<Scalars['Int']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
  transaction_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type book_keep_headers_max_fields = {
  book_keep_date?: Maybe<Scalars['date']['output']>
  book_keep_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_title?: Maybe<Scalars['String']['output']>
  document_number?: Maybe<Scalars['String']['output']>
  exchange_rate?: Maybe<Scalars['numeric']['output']>
  exchange_unit?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  payment_credit_amount?: Maybe<Scalars['Int']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
  que_number?: Maybe<Scalars['Int']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "book_keep_headers" */
export type book_keep_headers_max_order_by = {
  book_keep_date?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  customer_or_supplier_id?: InputMaybe<order_by>
  customer_or_supplier_title?: InputMaybe<order_by>
  document_number?: InputMaybe<order_by>
  exchange_rate?: InputMaybe<order_by>
  exchange_unit?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type book_keep_headers_min_fields = {
  book_keep_date?: Maybe<Scalars['date']['output']>
  book_keep_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_title?: Maybe<Scalars['String']['output']>
  document_number?: Maybe<Scalars['String']['output']>
  exchange_rate?: Maybe<Scalars['numeric']['output']>
  exchange_unit?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  payment_credit_amount?: Maybe<Scalars['Int']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
  que_number?: Maybe<Scalars['Int']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "book_keep_headers" */
export type book_keep_headers_min_order_by = {
  book_keep_date?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  customer_or_supplier_id?: InputMaybe<order_by>
  customer_or_supplier_title?: InputMaybe<order_by>
  document_number?: InputMaybe<order_by>
  exchange_rate?: InputMaybe<order_by>
  exchange_unit?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
}

/** response of any mutation on the table "book_keep_headers" */
export type book_keep_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<book_keep_headers>
}

/** input type for inserting object relation for remote table "book_keep_headers" */
export type book_keep_headers_obj_rel_insert_input = {
  data: book_keep_headers_insert_input
  on_conflict?: InputMaybe<book_keep_headers_on_conflict>
}

/** on conflict condition type for table "book_keep_headers" */
export type book_keep_headers_on_conflict = {
  constraint: book_keep_headers_constraint
  update_columns: Array<book_keep_headers_update_column>
  where?: InputMaybe<book_keep_headers_bool_exp>
}

/** ordering options when selecting data from "book_keep_headers" */
export type book_keep_headers_order_by = {
  book_keep_date?: InputMaybe<order_by>
  book_keep_headers_book_keep_lines_rel_aggregate?: InputMaybe<book_keep_lines_aggregate_order_by>
  book_keep_id?: InputMaybe<order_by>
  customer_or_supplier_id?: InputMaybe<order_by>
  customer_or_supplier_title?: InputMaybe<order_by>
  document_number?: InputMaybe<order_by>
  exchange_rate?: InputMaybe<order_by>
  exchange_unit?: InputMaybe<order_by>
  is_book_header_reported?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
}

/** select columns of table "book_keep_headers" */
export type book_keep_headers_select_column =
  /** column name */
  | 'book_keep_date'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'customer_or_supplier_id'
  /** column name */
  | 'customer_or_supplier_title'
  /** column name */
  | 'document_number'
  /** column name */
  | 'exchange_rate'
  /** column name */
  | 'exchange_unit'
  /** column name */
  | 'is_book_header_reported'
  /** column name */
  | 'our_company'
  /** column name */
  | 'payment_credit_amount'
  /** column name */
  | 'payment_credit_exchange_amount'
  /** column name */
  | 'payment_debit_amount'
  /** column name */
  | 'payment_debit_exchange_amount'
  /** column name */
  | 'payment_id'
  /** column name */
  | 'que_number'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'
  /** column name */
  | 'transaction_type'

/** input type for updating data in table "book_keep_headers" */
export type book_keep_headers_set_input = {
  book_keep_date?: InputMaybe<Scalars['date']['input']>
  book_keep_id?: InputMaybe<Scalars['String']['input']>
  customer_or_supplier_id?: InputMaybe<Scalars['String']['input']>
  customer_or_supplier_title?: InputMaybe<Scalars['String']['input']>
  document_number?: InputMaybe<Scalars['String']['input']>
  exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  exchange_unit?: InputMaybe<Scalars['String']['input']>
  is_book_header_reported?: InputMaybe<Scalars['Boolean']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  payment_credit_amount?: InputMaybe<Scalars['Int']['input']>
  payment_credit_exchange_amount?: InputMaybe<Scalars['Int']['input']>
  payment_debit_amount?: InputMaybe<Scalars['Int']['input']>
  payment_debit_exchange_amount?: InputMaybe<Scalars['Int']['input']>
  payment_id?: InputMaybe<Scalars['Int']['input']>
  que_number?: InputMaybe<Scalars['Int']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
  transaction_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type book_keep_headers_stddev_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "book_keep_headers" */
export type book_keep_headers_stddev_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type book_keep_headers_stddev_pop_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "book_keep_headers" */
export type book_keep_headers_stddev_pop_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type book_keep_headers_stddev_samp_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "book_keep_headers" */
export type book_keep_headers_stddev_samp_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type book_keep_headers_sum_fields = {
  exchange_rate?: Maybe<Scalars['numeric']['output']>
  payment_credit_amount?: Maybe<Scalars['Int']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_amount?: Maybe<Scalars['Int']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Int']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
  que_number?: Maybe<Scalars['Int']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "book_keep_headers" */
export type book_keep_headers_sum_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** update columns of table "book_keep_headers" */
export type book_keep_headers_update_column =
  /** column name */
  | 'book_keep_date'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'customer_or_supplier_id'
  /** column name */
  | 'customer_or_supplier_title'
  /** column name */
  | 'document_number'
  /** column name */
  | 'exchange_rate'
  /** column name */
  | 'exchange_unit'
  /** column name */
  | 'is_book_header_reported'
  /** column name */
  | 'our_company'
  /** column name */
  | 'payment_credit_amount'
  /** column name */
  | 'payment_credit_exchange_amount'
  /** column name */
  | 'payment_debit_amount'
  /** column name */
  | 'payment_debit_exchange_amount'
  /** column name */
  | 'payment_id'
  /** column name */
  | 'que_number'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'
  /** column name */
  | 'transaction_type'

/** aggregate var_pop on columns */
export type book_keep_headers_var_pop_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "book_keep_headers" */
export type book_keep_headers_var_pop_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type book_keep_headers_var_samp_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "book_keep_headers" */
export type book_keep_headers_var_samp_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type book_keep_headers_variance_fields = {
  exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_credit_amount?: Maybe<Scalars['Float']['output']>
  payment_credit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_amount?: Maybe<Scalars['Float']['output']>
  payment_debit_exchange_amount?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
  que_number?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "book_keep_headers" */
export type book_keep_headers_variance_order_by = {
  exchange_rate?: InputMaybe<order_by>
  payment_credit_amount?: InputMaybe<order_by>
  payment_credit_exchange_amount?: InputMaybe<order_by>
  payment_debit_amount?: InputMaybe<order_by>
  payment_debit_exchange_amount?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  que_number?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
}

/** columns and relationships of "book_keep_lines" */
export type book_keep_lines = {
  account_id_name: Scalars['String']['output']
  book_keep_id: Scalars['String']['output']
  /** An object relationship */
  book_keep_lines_book_keep_headers_rel?: Maybe<book_keep_headers>
  /** An array relationship */
  book_keep_lines_book_keep_lines_account_id_name_rel: Array<book_keep_lines>
  /** An aggregated array relationship */
  book_keep_lines_book_keep_lines_account_id_name_rel_aggregate: book_keep_lines_aggregate
  credit: Scalars['Int']['output']
  credit_in_exchange: Scalars['Int']['output']
  debit: Scalars['Int']['output']
  debit_in_exchange: Scalars['Int']['output']
  line_id: Scalars['Int']['output']
}

/** columns and relationships of "book_keep_lines" */
export type book_keep_linesbook_keep_lines_book_keep_lines_account_id_name_relArgs =
  {
    distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<book_keep_lines_order_by>>
    where?: InputMaybe<book_keep_lines_bool_exp>
  }

/** columns and relationships of "book_keep_lines" */
export type book_keep_linesbook_keep_lines_book_keep_lines_account_id_name_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<book_keep_lines_order_by>>
    where?: InputMaybe<book_keep_lines_bool_exp>
  }

/** aggregated selection of "book_keep_lines" */
export type book_keep_lines_aggregate = {
  aggregate?: Maybe<book_keep_lines_aggregate_fields>
  nodes: Array<book_keep_lines>
}

/** aggregate fields of "book_keep_lines" */
export type book_keep_lines_aggregate_fields = {
  avg?: Maybe<book_keep_lines_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<book_keep_lines_max_fields>
  min?: Maybe<book_keep_lines_min_fields>
  stddev?: Maybe<book_keep_lines_stddev_fields>
  stddev_pop?: Maybe<book_keep_lines_stddev_pop_fields>
  stddev_samp?: Maybe<book_keep_lines_stddev_samp_fields>
  sum?: Maybe<book_keep_lines_sum_fields>
  var_pop?: Maybe<book_keep_lines_var_pop_fields>
  var_samp?: Maybe<book_keep_lines_var_samp_fields>
  variance?: Maybe<book_keep_lines_variance_fields>
}

/** aggregate fields of "book_keep_lines" */
export type book_keep_lines_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<book_keep_lines_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "book_keep_lines" */
export type book_keep_lines_aggregate_order_by = {
  avg?: InputMaybe<book_keep_lines_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<book_keep_lines_max_order_by>
  min?: InputMaybe<book_keep_lines_min_order_by>
  stddev?: InputMaybe<book_keep_lines_stddev_order_by>
  stddev_pop?: InputMaybe<book_keep_lines_stddev_pop_order_by>
  stddev_samp?: InputMaybe<book_keep_lines_stddev_samp_order_by>
  sum?: InputMaybe<book_keep_lines_sum_order_by>
  var_pop?: InputMaybe<book_keep_lines_var_pop_order_by>
  var_samp?: InputMaybe<book_keep_lines_var_samp_order_by>
  variance?: InputMaybe<book_keep_lines_variance_order_by>
}

/** input type for inserting array relation for remote table "book_keep_lines" */
export type book_keep_lines_arr_rel_insert_input = {
  data: Array<book_keep_lines_insert_input>
  on_conflict?: InputMaybe<book_keep_lines_on_conflict>
}

/** aggregate avg on columns */
export type book_keep_lines_avg_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "book_keep_lines" */
export type book_keep_lines_avg_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "book_keep_lines". All fields are combined with a logical 'AND'. */
export type book_keep_lines_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<book_keep_lines_bool_exp>>>
  _not?: InputMaybe<book_keep_lines_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<book_keep_lines_bool_exp>>>
  account_id_name?: InputMaybe<String_comparison_exp>
  book_keep_id?: InputMaybe<String_comparison_exp>
  book_keep_lines_book_keep_headers_rel?: InputMaybe<book_keep_headers_bool_exp>
  book_keep_lines_book_keep_lines_account_id_name_rel?: InputMaybe<book_keep_lines_bool_exp>
  credit?: InputMaybe<Int_comparison_exp>
  credit_in_exchange?: InputMaybe<Int_comparison_exp>
  debit?: InputMaybe<Int_comparison_exp>
  debit_in_exchange?: InputMaybe<Int_comparison_exp>
  line_id?: InputMaybe<Int_comparison_exp>
}

/** unique or primary key constraints on table "book_keep_lines" */
export type book_keep_lines_constraint =
  /** unique or primary key constraint */
  'book_keep_lines_pkey'

/** input type for incrementing integer columne in table "book_keep_lines" */
export type book_keep_lines_inc_input = {
  credit?: InputMaybe<Scalars['Int']['input']>
  credit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  debit?: InputMaybe<Scalars['Int']['input']>
  debit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "book_keep_lines" */
export type book_keep_lines_insert_input = {
  account_id_name?: InputMaybe<Scalars['String']['input']>
  book_keep_id?: InputMaybe<Scalars['String']['input']>
  book_keep_lines_book_keep_headers_rel?: InputMaybe<book_keep_headers_obj_rel_insert_input>
  book_keep_lines_book_keep_lines_account_id_name_rel?: InputMaybe<book_keep_lines_arr_rel_insert_input>
  credit?: InputMaybe<Scalars['Int']['input']>
  credit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  debit?: InputMaybe<Scalars['Int']['input']>
  debit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate max on columns */
export type book_keep_lines_max_fields = {
  account_id_name?: Maybe<Scalars['String']['output']>
  book_keep_id?: Maybe<Scalars['String']['output']>
  credit?: Maybe<Scalars['Int']['output']>
  credit_in_exchange?: Maybe<Scalars['Int']['output']>
  debit?: Maybe<Scalars['Int']['output']>
  debit_in_exchange?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by max() on columns of table "book_keep_lines" */
export type book_keep_lines_max_order_by = {
  account_id_name?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type book_keep_lines_min_fields = {
  account_id_name?: Maybe<Scalars['String']['output']>
  book_keep_id?: Maybe<Scalars['String']['output']>
  credit?: Maybe<Scalars['Int']['output']>
  credit_in_exchange?: Maybe<Scalars['Int']['output']>
  debit?: Maybe<Scalars['Int']['output']>
  debit_in_exchange?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by min() on columns of table "book_keep_lines" */
export type book_keep_lines_min_order_by = {
  account_id_name?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "book_keep_lines" */
export type book_keep_lines_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<book_keep_lines>
}

/** input type for inserting object relation for remote table "book_keep_lines" */
export type book_keep_lines_obj_rel_insert_input = {
  data: book_keep_lines_insert_input
  on_conflict?: InputMaybe<book_keep_lines_on_conflict>
}

/** on conflict condition type for table "book_keep_lines" */
export type book_keep_lines_on_conflict = {
  constraint: book_keep_lines_constraint
  update_columns: Array<book_keep_lines_update_column>
  where?: InputMaybe<book_keep_lines_bool_exp>
}

/** ordering options when selecting data from "book_keep_lines" */
export type book_keep_lines_order_by = {
  account_id_name?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  book_keep_lines_book_keep_headers_rel?: InputMaybe<book_keep_headers_order_by>
  book_keep_lines_book_keep_lines_account_id_name_rel_aggregate?: InputMaybe<book_keep_lines_aggregate_order_by>
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** select columns of table "book_keep_lines" */
export type book_keep_lines_select_column =
  /** column name */
  | 'account_id_name'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'credit'
  /** column name */
  | 'credit_in_exchange'
  /** column name */
  | 'debit'
  /** column name */
  | 'debit_in_exchange'
  /** column name */
  | 'line_id'

/** input type for updating data in table "book_keep_lines" */
export type book_keep_lines_set_input = {
  account_id_name?: InputMaybe<Scalars['String']['input']>
  book_keep_id?: InputMaybe<Scalars['String']['input']>
  credit?: InputMaybe<Scalars['Int']['input']>
  credit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  debit?: InputMaybe<Scalars['Int']['input']>
  debit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type book_keep_lines_stddev_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "book_keep_lines" */
export type book_keep_lines_stddev_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type book_keep_lines_stddev_pop_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "book_keep_lines" */
export type book_keep_lines_stddev_pop_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type book_keep_lines_stddev_samp_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "book_keep_lines" */
export type book_keep_lines_stddev_samp_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type book_keep_lines_sum_fields = {
  credit?: Maybe<Scalars['Int']['output']>
  credit_in_exchange?: Maybe<Scalars['Int']['output']>
  debit?: Maybe<Scalars['Int']['output']>
  debit_in_exchange?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "book_keep_lines" */
export type book_keep_lines_sum_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** update columns of table "book_keep_lines" */
export type book_keep_lines_update_column =
  /** column name */
  | 'account_id_name'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'credit'
  /** column name */
  | 'credit_in_exchange'
  /** column name */
  | 'debit'
  /** column name */
  | 'debit_in_exchange'
  /** column name */
  | 'line_id'

/** aggregate var_pop on columns */
export type book_keep_lines_var_pop_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "book_keep_lines" */
export type book_keep_lines_var_pop_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type book_keep_lines_var_samp_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "book_keep_lines" */
export type book_keep_lines_var_samp_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type book_keep_lines_variance_fields = {
  credit?: Maybe<Scalars['Float']['output']>
  credit_in_exchange?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  debit_in_exchange?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "book_keep_lines" */
export type book_keep_lines_variance_order_by = {
  credit?: InputMaybe<order_by>
  credit_in_exchange?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  debit_in_exchange?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** columns and relationships of "collect_payment_report_headers" */
export type collect_payment_report_headers = {
  /** An array relationship */
  cp_report_headers_bk_headers_rel: Array<book_keep_headers>
  /** An aggregated array relationship */
  cp_report_headers_bk_headers_rel_aggregate: book_keep_headers_aggregate
  our_company: Scalars['String']['output']
  report_date: Scalars['date']['output']
  report_number: Scalars['Int']['output']
  report_type: Scalars['String']['output']
}

/** columns and relationships of "collect_payment_report_headers" */
export type collect_payment_report_headerscp_report_headers_bk_headers_relArgs =
  {
    distinct_on?: InputMaybe<Array<book_keep_headers_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<book_keep_headers_order_by>>
    where?: InputMaybe<book_keep_headers_bool_exp>
  }

/** columns and relationships of "collect_payment_report_headers" */
export type collect_payment_report_headerscp_report_headers_bk_headers_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<book_keep_headers_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<book_keep_headers_order_by>>
    where?: InputMaybe<book_keep_headers_bool_exp>
  }

/** aggregated selection of "collect_payment_report_headers" */
export type collect_payment_report_headers_aggregate = {
  aggregate?: Maybe<collect_payment_report_headers_aggregate_fields>
  nodes: Array<collect_payment_report_headers>
}

/** aggregate fields of "collect_payment_report_headers" */
export type collect_payment_report_headers_aggregate_fields = {
  avg?: Maybe<collect_payment_report_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<collect_payment_report_headers_max_fields>
  min?: Maybe<collect_payment_report_headers_min_fields>
  stddev?: Maybe<collect_payment_report_headers_stddev_fields>
  stddev_pop?: Maybe<collect_payment_report_headers_stddev_pop_fields>
  stddev_samp?: Maybe<collect_payment_report_headers_stddev_samp_fields>
  sum?: Maybe<collect_payment_report_headers_sum_fields>
  var_pop?: Maybe<collect_payment_report_headers_var_pop_fields>
  var_samp?: Maybe<collect_payment_report_headers_var_samp_fields>
  variance?: Maybe<collect_payment_report_headers_variance_fields>
}

/** aggregate fields of "collect_payment_report_headers" */
export type collect_payment_report_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<collect_payment_report_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "collect_payment_report_headers" */
export type collect_payment_report_headers_aggregate_order_by = {
  avg?: InputMaybe<collect_payment_report_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<collect_payment_report_headers_max_order_by>
  min?: InputMaybe<collect_payment_report_headers_min_order_by>
  stddev?: InputMaybe<collect_payment_report_headers_stddev_order_by>
  stddev_pop?: InputMaybe<collect_payment_report_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<collect_payment_report_headers_stddev_samp_order_by>
  sum?: InputMaybe<collect_payment_report_headers_sum_order_by>
  var_pop?: InputMaybe<collect_payment_report_headers_var_pop_order_by>
  var_samp?: InputMaybe<collect_payment_report_headers_var_samp_order_by>
  variance?: InputMaybe<collect_payment_report_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "collect_payment_report_headers" */
export type collect_payment_report_headers_arr_rel_insert_input = {
  data: Array<collect_payment_report_headers_insert_input>
  on_conflict?: InputMaybe<collect_payment_report_headers_on_conflict>
}

/** aggregate avg on columns */
export type collect_payment_report_headers_avg_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_avg_order_by = {
  report_number?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "collect_payment_report_headers". All fields are combined with a logical 'AND'. */
export type collect_payment_report_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<collect_payment_report_headers_bool_exp>>>
  _not?: InputMaybe<collect_payment_report_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<collect_payment_report_headers_bool_exp>>>
  cp_report_headers_bk_headers_rel?: InputMaybe<book_keep_headers_bool_exp>
  our_company?: InputMaybe<String_comparison_exp>
  report_date?: InputMaybe<date_comparison_exp>
  report_number?: InputMaybe<Int_comparison_exp>
  report_type?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "collect_payment_report_headers" */
export type collect_payment_report_headers_constraint =
  /** unique or primary key constraint */
  'collect_payment_report_headers_pkey'

/** input type for incrementing integer columne in table "collect_payment_report_headers" */
export type collect_payment_report_headers_inc_input = {
  report_number?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "collect_payment_report_headers" */
export type collect_payment_report_headers_insert_input = {
  cp_report_headers_bk_headers_rel?: InputMaybe<book_keep_headers_arr_rel_insert_input>
  our_company?: InputMaybe<Scalars['String']['input']>
  report_date?: InputMaybe<Scalars['date']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type collect_payment_report_headers_max_fields = {
  our_company?: Maybe<Scalars['String']['output']>
  report_date?: Maybe<Scalars['date']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_max_order_by = {
  our_company?: InputMaybe<order_by>
  report_date?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type collect_payment_report_headers_min_fields = {
  our_company?: Maybe<Scalars['String']['output']>
  report_date?: Maybe<Scalars['date']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_min_order_by = {
  our_company?: InputMaybe<order_by>
  report_date?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** response of any mutation on the table "collect_payment_report_headers" */
export type collect_payment_report_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<collect_payment_report_headers>
}

/** input type for inserting object relation for remote table "collect_payment_report_headers" */
export type collect_payment_report_headers_obj_rel_insert_input = {
  data: collect_payment_report_headers_insert_input
  on_conflict?: InputMaybe<collect_payment_report_headers_on_conflict>
}

/** on conflict condition type for table "collect_payment_report_headers" */
export type collect_payment_report_headers_on_conflict = {
  constraint: collect_payment_report_headers_constraint
  update_columns: Array<collect_payment_report_headers_update_column>
  where?: InputMaybe<collect_payment_report_headers_bool_exp>
}

/** ordering options when selecting data from "collect_payment_report_headers" */
export type collect_payment_report_headers_order_by = {
  cp_report_headers_bk_headers_rel_aggregate?: InputMaybe<book_keep_headers_aggregate_order_by>
  our_company?: InputMaybe<order_by>
  report_date?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** select columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_select_column =
  /** column name */
  | 'our_company'
  /** column name */
  | 'report_date'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'

/** input type for updating data in table "collect_payment_report_headers" */
export type collect_payment_report_headers_set_input = {
  our_company?: InputMaybe<Scalars['String']['input']>
  report_date?: InputMaybe<Scalars['date']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type collect_payment_report_headers_stddev_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_stddev_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type collect_payment_report_headers_stddev_pop_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_stddev_pop_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type collect_payment_report_headers_stddev_samp_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_stddev_samp_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type collect_payment_report_headers_sum_fields = {
  report_number?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_sum_order_by = {
  report_number?: InputMaybe<order_by>
}

/** update columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_update_column =
  /** column name */
  | 'our_company'
  /** column name */
  | 'report_date'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'

/** aggregate var_pop on columns */
export type collect_payment_report_headers_var_pop_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_var_pop_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type collect_payment_report_headers_var_samp_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_var_samp_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type collect_payment_report_headers_variance_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "collect_payment_report_headers" */
export type collect_payment_report_headers_variance_order_by = {
  report_number?: InputMaybe<order_by>
}

/** columns and relationships of "companies" */
export type companies = {
  /** An array relationship */
  _our_companies_persistent_states: Array<_our_companies_persistent_state>
  /** An aggregated array relationship */
  _our_companies_persistent_states_aggregate: _our_companies_persistent_state_aggregate
  /** An array relationship */
  _user_persistent_states: Array<_user_persistent_state>
  /** An aggregated array relationship */
  _user_persistent_states_aggregate: _user_persistent_state_aggregate
  about_us_64base?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  addresses: Array<addresses>
  /** An aggregated array relationship */
  addresses_aggregate: addresses_aggregate
  bic_code?: Maybe<Scalars['String']['output']>
  cid_first_group?: Maybe<Scalars['Int']['output']>
  cid_second_group?: Maybe<Scalars['Int']['output']>
  company_address_line_1?: Maybe<Scalars['String']['output']>
  company_address_line_2?: Maybe<Scalars['String']['output']>
  company_bank_giro?: Maybe<Scalars['String']['output']>
  company_city?: Maybe<Scalars['String']['output']>
  company_country?: Maybe<Scalars['String']['output']>
  company_customer_service_email?: Maybe<Scalars['String']['output']>
  company_customer_service_tel?: Maybe<Scalars['String']['output']>
  company_email?: Maybe<Scalars['String']['output']>
  company_finans_email?: Maybe<Scalars['String']['output']>
  company_finans_tel?: Maybe<Scalars['String']['output']>
  company_image_link?: Maybe<Scalars['String']['output']>
  company_is_active: Scalars['Boolean']['output']
  company_logo_64base?: Maybe<Scalars['String']['output']>
  company_name: Scalars['String']['output']
  company_nickname: Scalars['String']['output']
  company_order_email?: Maybe<Scalars['String']['output']>
  company_order_tel?: Maybe<Scalars['String']['output']>
  company_org_num: Scalars['String']['output']
  company_post_code?: Maybe<Scalars['String']['output']>
  company_reference?: Maybe<Scalars['String']['output']>
  company_state?: Maybe<Scalars['String']['output']>
  company_tel?: Maybe<Scalars['String']['output']>
  company_watermark_64base?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  customer_price_lists: Array<customer_price_list>
  /** An aggregated array relationship */
  customer_price_lists_aggregate: customer_price_list_aggregate
  /** An array relationship */
  dispatch_headers: Array<dispatch_headers>
  /** An aggregated array relationship */
  dispatch_headers_aggregate: dispatch_headers_aggregate
  dispatch_number: Scalars['Int']['output']
  /** An array relationship */
  document_transactions: Array<document_transactions>
  /** An aggregated array relationship */
  document_transactions_aggregate: document_transactions_aggregate
  iban_code?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  invoice_fee_to_apply: Scalars['Int']['output']
  invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  /** An array relationship */
  invoice_journal_headers: Array<invoice_journal_headers>
  /** An aggregated array relationship */
  invoice_journal_headers_aggregate: invoice_journal_headers_aggregate
  invoice_number: Scalars['Int']['output']
  is_invoice_fee_appliable: Scalars['Boolean']['output']
  letter_code: Scalars['String']['output']
  meddelande_or_ocr: Scalars['String']['output']
  /** An array relationship */
  order_headers: Array<order_headers>
  /** An aggregated array relationship */
  order_headers_aggregate: order_headers_aggregate
  order_number: Scalars['Int']['output']
  purchase_invoice_number?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  reminder_headers: Array<reminder_headers>
  /** An aggregated array relationship */
  reminder_headers_aggregate: reminder_headers_aggregate
  reminder_number: Scalars['Int']['output']
  /** An array relationship */
  stocks: Array<stock>
  /** An aggregated array relationship */
  stocks_aggregate: stock_aggregate
  supplier_invoice_id: Scalars['Int']['output']
  /** An array relationship */
  telephones: Array<telephones>
  /** An aggregated array relationship */
  telephones_aggregate: telephones_aggregate
}

/** columns and relationships of "companies" */
export type companies_our_companies_persistent_statesArgs = {
  distinct_on?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_our_companies_persistent_state_order_by>>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** columns and relationships of "companies" */
export type companies_our_companies_persistent_states_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_our_companies_persistent_state_order_by>>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** columns and relationships of "companies" */
export type companies_user_persistent_statesArgs = {
  distinct_on?: InputMaybe<Array<_user_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_user_persistent_state_order_by>>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** columns and relationships of "companies" */
export type companies_user_persistent_states_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_user_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_user_persistent_state_order_by>>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesaddressesArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesaddresses_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "companies" */
export type companiescustomer_price_listsArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** columns and relationships of "companies" */
export type companiescustomer_price_lists_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesdispatch_headersArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesdispatch_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesdocument_transactionsArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesdocument_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesinvoice_journal_headersArgs = {
  distinct_on?: InputMaybe<Array<invoice_journal_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_journal_headers_order_by>>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesinvoice_journal_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_journal_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_journal_headers_order_by>>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesorder_headersArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesorder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesreminder_headersArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesreminder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesstocksArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** columns and relationships of "companies" */
export type companiesstocks_aggregateArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** columns and relationships of "companies" */
export type companiestelephonesArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** columns and relationships of "companies" */
export type companiestelephones_aggregateArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** aggregated selection of "companies" */
export type companies_aggregate = {
  aggregate?: Maybe<companies_aggregate_fields>
  nodes: Array<companies>
}

/** aggregate fields of "companies" */
export type companies_aggregate_fields = {
  avg?: Maybe<companies_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<companies_max_fields>
  min?: Maybe<companies_min_fields>
  stddev?: Maybe<companies_stddev_fields>
  stddev_pop?: Maybe<companies_stddev_pop_fields>
  stddev_samp?: Maybe<companies_stddev_samp_fields>
  sum?: Maybe<companies_sum_fields>
  var_pop?: Maybe<companies_var_pop_fields>
  var_samp?: Maybe<companies_var_samp_fields>
  variance?: Maybe<companies_variance_fields>
}

/** aggregate fields of "companies" */
export type companies_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<companies_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "companies" */
export type companies_aggregate_order_by = {
  avg?: InputMaybe<companies_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<companies_max_order_by>
  min?: InputMaybe<companies_min_order_by>
  stddev?: InputMaybe<companies_stddev_order_by>
  stddev_pop?: InputMaybe<companies_stddev_pop_order_by>
  stddev_samp?: InputMaybe<companies_stddev_samp_order_by>
  sum?: InputMaybe<companies_sum_order_by>
  var_pop?: InputMaybe<companies_var_pop_order_by>
  var_samp?: InputMaybe<companies_var_samp_order_by>
  variance?: InputMaybe<companies_variance_order_by>
}

/** input type for inserting array relation for remote table "companies" */
export type companies_arr_rel_insert_input = {
  data: Array<companies_insert_input>
  on_conflict?: InputMaybe<companies_on_conflict>
}

/** aggregate avg on columns */
export type companies_avg_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "companies" */
export type companies_avg_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "companies". All fields are combined with a logical 'AND'. */
export type companies_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<companies_bool_exp>>>
  _not?: InputMaybe<companies_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<companies_bool_exp>>>
  _our_companies_persistent_states?: InputMaybe<_our_companies_persistent_state_bool_exp>
  _user_persistent_states?: InputMaybe<_user_persistent_state_bool_exp>
  about_us_64base?: InputMaybe<String_comparison_exp>
  addresses?: InputMaybe<addresses_bool_exp>
  bic_code?: InputMaybe<String_comparison_exp>
  cid_first_group?: InputMaybe<Int_comparison_exp>
  cid_second_group?: InputMaybe<Int_comparison_exp>
  company_address_line_1?: InputMaybe<String_comparison_exp>
  company_address_line_2?: InputMaybe<String_comparison_exp>
  company_bank_giro?: InputMaybe<String_comparison_exp>
  company_city?: InputMaybe<String_comparison_exp>
  company_country?: InputMaybe<String_comparison_exp>
  company_customer_service_email?: InputMaybe<String_comparison_exp>
  company_customer_service_tel?: InputMaybe<String_comparison_exp>
  company_email?: InputMaybe<String_comparison_exp>
  company_finans_email?: InputMaybe<String_comparison_exp>
  company_finans_tel?: InputMaybe<String_comparison_exp>
  company_image_link?: InputMaybe<String_comparison_exp>
  company_is_active?: InputMaybe<Boolean_comparison_exp>
  company_logo_64base?: InputMaybe<String_comparison_exp>
  company_name?: InputMaybe<String_comparison_exp>
  company_nickname?: InputMaybe<String_comparison_exp>
  company_order_email?: InputMaybe<String_comparison_exp>
  company_order_tel?: InputMaybe<String_comparison_exp>
  company_org_num?: InputMaybe<String_comparison_exp>
  company_post_code?: InputMaybe<String_comparison_exp>
  company_reference?: InputMaybe<String_comparison_exp>
  company_state?: InputMaybe<String_comparison_exp>
  company_tel?: InputMaybe<String_comparison_exp>
  company_watermark_64base?: InputMaybe<String_comparison_exp>
  customer_price_lists?: InputMaybe<customer_price_list_bool_exp>
  dispatch_headers?: InputMaybe<dispatch_headers_bool_exp>
  dispatch_number?: InputMaybe<Int_comparison_exp>
  document_transactions?: InputMaybe<document_transactions_bool_exp>
  iban_code?: InputMaybe<String_comparison_exp>
  invoice_address_id?: InputMaybe<String_comparison_exp>
  invoice_fee_to_apply?: InputMaybe<Int_comparison_exp>
  invoice_fee_vat?: InputMaybe<Int_comparison_exp>
  invoice_journal_headers?: InputMaybe<invoice_journal_headers_bool_exp>
  invoice_number?: InputMaybe<Int_comparison_exp>
  is_invoice_fee_appliable?: InputMaybe<Boolean_comparison_exp>
  letter_code?: InputMaybe<String_comparison_exp>
  meddelande_or_ocr?: InputMaybe<String_comparison_exp>
  order_headers?: InputMaybe<order_headers_bool_exp>
  order_number?: InputMaybe<Int_comparison_exp>
  purchase_invoice_number?: InputMaybe<String_comparison_exp>
  reminder_headers?: InputMaybe<reminder_headers_bool_exp>
  reminder_number?: InputMaybe<Int_comparison_exp>
  stocks?: InputMaybe<stock_bool_exp>
  supplier_invoice_id?: InputMaybe<Int_comparison_exp>
  telephones?: InputMaybe<telephones_bool_exp>
}

/** unique or primary key constraints on table "companies" */
export type companies_constraint =
  /** unique or primary key constraint */
  | 'companies_company_nickname_key'
  /** unique or primary key constraint */
  | 'companies_pkey'

/** input type for incrementing integer columne in table "companies" */
export type companies_inc_input = {
  cid_first_group?: InputMaybe<Scalars['Int']['input']>
  cid_second_group?: InputMaybe<Scalars['Int']['input']>
  dispatch_number?: InputMaybe<Scalars['Int']['input']>
  invoice_fee_to_apply?: InputMaybe<Scalars['Int']['input']>
  invoice_fee_vat?: InputMaybe<Scalars['Int']['input']>
  invoice_number?: InputMaybe<Scalars['Int']['input']>
  order_number?: InputMaybe<Scalars['Int']['input']>
  reminder_number?: InputMaybe<Scalars['Int']['input']>
  supplier_invoice_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "companies" */
export type companies_insert_input = {
  _our_companies_persistent_states?: InputMaybe<_our_companies_persistent_state_arr_rel_insert_input>
  _user_persistent_states?: InputMaybe<_user_persistent_state_arr_rel_insert_input>
  about_us_64base?: InputMaybe<Scalars['String']['input']>
  addresses?: InputMaybe<addresses_arr_rel_insert_input>
  bic_code?: InputMaybe<Scalars['String']['input']>
  cid_first_group?: InputMaybe<Scalars['Int']['input']>
  cid_second_group?: InputMaybe<Scalars['Int']['input']>
  company_address_line_1?: InputMaybe<Scalars['String']['input']>
  company_address_line_2?: InputMaybe<Scalars['String']['input']>
  company_bank_giro?: InputMaybe<Scalars['String']['input']>
  company_city?: InputMaybe<Scalars['String']['input']>
  company_country?: InputMaybe<Scalars['String']['input']>
  company_customer_service_email?: InputMaybe<Scalars['String']['input']>
  company_customer_service_tel?: InputMaybe<Scalars['String']['input']>
  company_email?: InputMaybe<Scalars['String']['input']>
  company_finans_email?: InputMaybe<Scalars['String']['input']>
  company_finans_tel?: InputMaybe<Scalars['String']['input']>
  company_image_link?: InputMaybe<Scalars['String']['input']>
  company_is_active?: InputMaybe<Scalars['Boolean']['input']>
  company_logo_64base?: InputMaybe<Scalars['String']['input']>
  company_name?: InputMaybe<Scalars['String']['input']>
  company_nickname?: InputMaybe<Scalars['String']['input']>
  company_order_email?: InputMaybe<Scalars['String']['input']>
  company_order_tel?: InputMaybe<Scalars['String']['input']>
  company_org_num?: InputMaybe<Scalars['String']['input']>
  company_post_code?: InputMaybe<Scalars['String']['input']>
  company_reference?: InputMaybe<Scalars['String']['input']>
  company_state?: InputMaybe<Scalars['String']['input']>
  company_tel?: InputMaybe<Scalars['String']['input']>
  company_watermark_64base?: InputMaybe<Scalars['String']['input']>
  customer_price_lists?: InputMaybe<customer_price_list_arr_rel_insert_input>
  dispatch_headers?: InputMaybe<dispatch_headers_arr_rel_insert_input>
  dispatch_number?: InputMaybe<Scalars['Int']['input']>
  document_transactions?: InputMaybe<document_transactions_arr_rel_insert_input>
  iban_code?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  invoice_fee_to_apply?: InputMaybe<Scalars['Int']['input']>
  invoice_fee_vat?: InputMaybe<Scalars['Int']['input']>
  invoice_journal_headers?: InputMaybe<invoice_journal_headers_arr_rel_insert_input>
  invoice_number?: InputMaybe<Scalars['Int']['input']>
  is_invoice_fee_appliable?: InputMaybe<Scalars['Boolean']['input']>
  letter_code?: InputMaybe<Scalars['String']['input']>
  meddelande_or_ocr?: InputMaybe<Scalars['String']['input']>
  order_headers?: InputMaybe<order_headers_arr_rel_insert_input>
  order_number?: InputMaybe<Scalars['Int']['input']>
  purchase_invoice_number?: InputMaybe<Scalars['String']['input']>
  reminder_headers?: InputMaybe<reminder_headers_arr_rel_insert_input>
  reminder_number?: InputMaybe<Scalars['Int']['input']>
  stocks?: InputMaybe<stock_arr_rel_insert_input>
  supplier_invoice_id?: InputMaybe<Scalars['Int']['input']>
  telephones?: InputMaybe<telephones_arr_rel_insert_input>
}

/** aggregate max on columns */
export type companies_max_fields = {
  about_us_64base?: Maybe<Scalars['String']['output']>
  bic_code?: Maybe<Scalars['String']['output']>
  cid_first_group?: Maybe<Scalars['Int']['output']>
  cid_second_group?: Maybe<Scalars['Int']['output']>
  company_address_line_1?: Maybe<Scalars['String']['output']>
  company_address_line_2?: Maybe<Scalars['String']['output']>
  company_bank_giro?: Maybe<Scalars['String']['output']>
  company_city?: Maybe<Scalars['String']['output']>
  company_country?: Maybe<Scalars['String']['output']>
  company_customer_service_email?: Maybe<Scalars['String']['output']>
  company_customer_service_tel?: Maybe<Scalars['String']['output']>
  company_email?: Maybe<Scalars['String']['output']>
  company_finans_email?: Maybe<Scalars['String']['output']>
  company_finans_tel?: Maybe<Scalars['String']['output']>
  company_image_link?: Maybe<Scalars['String']['output']>
  company_logo_64base?: Maybe<Scalars['String']['output']>
  company_name?: Maybe<Scalars['String']['output']>
  company_nickname?: Maybe<Scalars['String']['output']>
  company_order_email?: Maybe<Scalars['String']['output']>
  company_order_tel?: Maybe<Scalars['String']['output']>
  company_org_num?: Maybe<Scalars['String']['output']>
  company_post_code?: Maybe<Scalars['String']['output']>
  company_reference?: Maybe<Scalars['String']['output']>
  company_state?: Maybe<Scalars['String']['output']>
  company_tel?: Maybe<Scalars['String']['output']>
  company_watermark_64base?: Maybe<Scalars['String']['output']>
  dispatch_number?: Maybe<Scalars['Int']['output']>
  iban_code?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Int']['output']>
  invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  invoice_number?: Maybe<Scalars['Int']['output']>
  letter_code?: Maybe<Scalars['String']['output']>
  meddelande_or_ocr?: Maybe<Scalars['String']['output']>
  order_number?: Maybe<Scalars['Int']['output']>
  purchase_invoice_number?: Maybe<Scalars['String']['output']>
  reminder_number?: Maybe<Scalars['Int']['output']>
  supplier_invoice_id?: Maybe<Scalars['Int']['output']>
}

/** order by max() on columns of table "companies" */
export type companies_max_order_by = {
  about_us_64base?: InputMaybe<order_by>
  bic_code?: InputMaybe<order_by>
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  company_address_line_1?: InputMaybe<order_by>
  company_address_line_2?: InputMaybe<order_by>
  company_bank_giro?: InputMaybe<order_by>
  company_city?: InputMaybe<order_by>
  company_country?: InputMaybe<order_by>
  company_customer_service_email?: InputMaybe<order_by>
  company_customer_service_tel?: InputMaybe<order_by>
  company_email?: InputMaybe<order_by>
  company_finans_email?: InputMaybe<order_by>
  company_finans_tel?: InputMaybe<order_by>
  company_image_link?: InputMaybe<order_by>
  company_logo_64base?: InputMaybe<order_by>
  company_name?: InputMaybe<order_by>
  company_nickname?: InputMaybe<order_by>
  company_order_email?: InputMaybe<order_by>
  company_order_tel?: InputMaybe<order_by>
  company_org_num?: InputMaybe<order_by>
  company_post_code?: InputMaybe<order_by>
  company_reference?: InputMaybe<order_by>
  company_state?: InputMaybe<order_by>
  company_tel?: InputMaybe<order_by>
  company_watermark_64base?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  iban_code?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  letter_code?: InputMaybe<order_by>
  meddelande_or_ocr?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  purchase_invoice_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type companies_min_fields = {
  about_us_64base?: Maybe<Scalars['String']['output']>
  bic_code?: Maybe<Scalars['String']['output']>
  cid_first_group?: Maybe<Scalars['Int']['output']>
  cid_second_group?: Maybe<Scalars['Int']['output']>
  company_address_line_1?: Maybe<Scalars['String']['output']>
  company_address_line_2?: Maybe<Scalars['String']['output']>
  company_bank_giro?: Maybe<Scalars['String']['output']>
  company_city?: Maybe<Scalars['String']['output']>
  company_country?: Maybe<Scalars['String']['output']>
  company_customer_service_email?: Maybe<Scalars['String']['output']>
  company_customer_service_tel?: Maybe<Scalars['String']['output']>
  company_email?: Maybe<Scalars['String']['output']>
  company_finans_email?: Maybe<Scalars['String']['output']>
  company_finans_tel?: Maybe<Scalars['String']['output']>
  company_image_link?: Maybe<Scalars['String']['output']>
  company_logo_64base?: Maybe<Scalars['String']['output']>
  company_name?: Maybe<Scalars['String']['output']>
  company_nickname?: Maybe<Scalars['String']['output']>
  company_order_email?: Maybe<Scalars['String']['output']>
  company_order_tel?: Maybe<Scalars['String']['output']>
  company_org_num?: Maybe<Scalars['String']['output']>
  company_post_code?: Maybe<Scalars['String']['output']>
  company_reference?: Maybe<Scalars['String']['output']>
  company_state?: Maybe<Scalars['String']['output']>
  company_tel?: Maybe<Scalars['String']['output']>
  company_watermark_64base?: Maybe<Scalars['String']['output']>
  dispatch_number?: Maybe<Scalars['Int']['output']>
  iban_code?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Int']['output']>
  invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  invoice_number?: Maybe<Scalars['Int']['output']>
  letter_code?: Maybe<Scalars['String']['output']>
  meddelande_or_ocr?: Maybe<Scalars['String']['output']>
  order_number?: Maybe<Scalars['Int']['output']>
  purchase_invoice_number?: Maybe<Scalars['String']['output']>
  reminder_number?: Maybe<Scalars['Int']['output']>
  supplier_invoice_id?: Maybe<Scalars['Int']['output']>
}

/** order by min() on columns of table "companies" */
export type companies_min_order_by = {
  about_us_64base?: InputMaybe<order_by>
  bic_code?: InputMaybe<order_by>
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  company_address_line_1?: InputMaybe<order_by>
  company_address_line_2?: InputMaybe<order_by>
  company_bank_giro?: InputMaybe<order_by>
  company_city?: InputMaybe<order_by>
  company_country?: InputMaybe<order_by>
  company_customer_service_email?: InputMaybe<order_by>
  company_customer_service_tel?: InputMaybe<order_by>
  company_email?: InputMaybe<order_by>
  company_finans_email?: InputMaybe<order_by>
  company_finans_tel?: InputMaybe<order_by>
  company_image_link?: InputMaybe<order_by>
  company_logo_64base?: InputMaybe<order_by>
  company_name?: InputMaybe<order_by>
  company_nickname?: InputMaybe<order_by>
  company_order_email?: InputMaybe<order_by>
  company_order_tel?: InputMaybe<order_by>
  company_org_num?: InputMaybe<order_by>
  company_post_code?: InputMaybe<order_by>
  company_reference?: InputMaybe<order_by>
  company_state?: InputMaybe<order_by>
  company_tel?: InputMaybe<order_by>
  company_watermark_64base?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  iban_code?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  letter_code?: InputMaybe<order_by>
  meddelande_or_ocr?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  purchase_invoice_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "companies" */
export type companies_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<companies>
}

/** input type for inserting object relation for remote table "companies" */
export type companies_obj_rel_insert_input = {
  data: companies_insert_input
  on_conflict?: InputMaybe<companies_on_conflict>
}

/** on conflict condition type for table "companies" */
export type companies_on_conflict = {
  constraint: companies_constraint
  update_columns: Array<companies_update_column>
  where?: InputMaybe<companies_bool_exp>
}

/** ordering options when selecting data from "companies" */
export type companies_order_by = {
  _our_companies_persistent_states_aggregate?: InputMaybe<_our_companies_persistent_state_aggregate_order_by>
  _user_persistent_states_aggregate?: InputMaybe<_user_persistent_state_aggregate_order_by>
  about_us_64base?: InputMaybe<order_by>
  addresses_aggregate?: InputMaybe<addresses_aggregate_order_by>
  bic_code?: InputMaybe<order_by>
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  company_address_line_1?: InputMaybe<order_by>
  company_address_line_2?: InputMaybe<order_by>
  company_bank_giro?: InputMaybe<order_by>
  company_city?: InputMaybe<order_by>
  company_country?: InputMaybe<order_by>
  company_customer_service_email?: InputMaybe<order_by>
  company_customer_service_tel?: InputMaybe<order_by>
  company_email?: InputMaybe<order_by>
  company_finans_email?: InputMaybe<order_by>
  company_finans_tel?: InputMaybe<order_by>
  company_image_link?: InputMaybe<order_by>
  company_is_active?: InputMaybe<order_by>
  company_logo_64base?: InputMaybe<order_by>
  company_name?: InputMaybe<order_by>
  company_nickname?: InputMaybe<order_by>
  company_order_email?: InputMaybe<order_by>
  company_order_tel?: InputMaybe<order_by>
  company_org_num?: InputMaybe<order_by>
  company_post_code?: InputMaybe<order_by>
  company_reference?: InputMaybe<order_by>
  company_state?: InputMaybe<order_by>
  company_tel?: InputMaybe<order_by>
  company_watermark_64base?: InputMaybe<order_by>
  customer_price_lists_aggregate?: InputMaybe<customer_price_list_aggregate_order_by>
  dispatch_headers_aggregate?: InputMaybe<dispatch_headers_aggregate_order_by>
  dispatch_number?: InputMaybe<order_by>
  document_transactions_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  iban_code?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_journal_headers_aggregate?: InputMaybe<invoice_journal_headers_aggregate_order_by>
  invoice_number?: InputMaybe<order_by>
  is_invoice_fee_appliable?: InputMaybe<order_by>
  letter_code?: InputMaybe<order_by>
  meddelande_or_ocr?: InputMaybe<order_by>
  order_headers_aggregate?: InputMaybe<order_headers_aggregate_order_by>
  order_number?: InputMaybe<order_by>
  purchase_invoice_number?: InputMaybe<order_by>
  reminder_headers_aggregate?: InputMaybe<reminder_headers_aggregate_order_by>
  reminder_number?: InputMaybe<order_by>
  stocks_aggregate?: InputMaybe<stock_aggregate_order_by>
  supplier_invoice_id?: InputMaybe<order_by>
  telephones_aggregate?: InputMaybe<telephones_aggregate_order_by>
}

/** select columns of table "companies" */
export type companies_select_column =
  /** column name */
  | 'about_us_64base'
  /** column name */
  | 'bic_code'
  /** column name */
  | 'cid_first_group'
  /** column name */
  | 'cid_second_group'
  /** column name */
  | 'company_address_line_1'
  /** column name */
  | 'company_address_line_2'
  /** column name */
  | 'company_bank_giro'
  /** column name */
  | 'company_city'
  /** column name */
  | 'company_country'
  /** column name */
  | 'company_customer_service_email'
  /** column name */
  | 'company_customer_service_tel'
  /** column name */
  | 'company_email'
  /** column name */
  | 'company_finans_email'
  /** column name */
  | 'company_finans_tel'
  /** column name */
  | 'company_image_link'
  /** column name */
  | 'company_is_active'
  /** column name */
  | 'company_logo_64base'
  /** column name */
  | 'company_name'
  /** column name */
  | 'company_nickname'
  /** column name */
  | 'company_order_email'
  /** column name */
  | 'company_order_tel'
  /** column name */
  | 'company_org_num'
  /** column name */
  | 'company_post_code'
  /** column name */
  | 'company_reference'
  /** column name */
  | 'company_state'
  /** column name */
  | 'company_tel'
  /** column name */
  | 'company_watermark_64base'
  /** column name */
  | 'dispatch_number'
  /** column name */
  | 'iban_code'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'invoice_fee_to_apply'
  /** column name */
  | 'invoice_fee_vat'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'is_invoice_fee_appliable'
  /** column name */
  | 'letter_code'
  /** column name */
  | 'meddelande_or_ocr'
  /** column name */
  | 'order_number'
  /** column name */
  | 'purchase_invoice_number'
  /** column name */
  | 'reminder_number'
  /** column name */
  | 'supplier_invoice_id'

/** input type for updating data in table "companies" */
export type companies_set_input = {
  about_us_64base?: InputMaybe<Scalars['String']['input']>
  bic_code?: InputMaybe<Scalars['String']['input']>
  cid_first_group?: InputMaybe<Scalars['Int']['input']>
  cid_second_group?: InputMaybe<Scalars['Int']['input']>
  company_address_line_1?: InputMaybe<Scalars['String']['input']>
  company_address_line_2?: InputMaybe<Scalars['String']['input']>
  company_bank_giro?: InputMaybe<Scalars['String']['input']>
  company_city?: InputMaybe<Scalars['String']['input']>
  company_country?: InputMaybe<Scalars['String']['input']>
  company_customer_service_email?: InputMaybe<Scalars['String']['input']>
  company_customer_service_tel?: InputMaybe<Scalars['String']['input']>
  company_email?: InputMaybe<Scalars['String']['input']>
  company_finans_email?: InputMaybe<Scalars['String']['input']>
  company_finans_tel?: InputMaybe<Scalars['String']['input']>
  company_image_link?: InputMaybe<Scalars['String']['input']>
  company_is_active?: InputMaybe<Scalars['Boolean']['input']>
  company_logo_64base?: InputMaybe<Scalars['String']['input']>
  company_name?: InputMaybe<Scalars['String']['input']>
  company_nickname?: InputMaybe<Scalars['String']['input']>
  company_order_email?: InputMaybe<Scalars['String']['input']>
  company_order_tel?: InputMaybe<Scalars['String']['input']>
  company_org_num?: InputMaybe<Scalars['String']['input']>
  company_post_code?: InputMaybe<Scalars['String']['input']>
  company_reference?: InputMaybe<Scalars['String']['input']>
  company_state?: InputMaybe<Scalars['String']['input']>
  company_tel?: InputMaybe<Scalars['String']['input']>
  company_watermark_64base?: InputMaybe<Scalars['String']['input']>
  dispatch_number?: InputMaybe<Scalars['Int']['input']>
  iban_code?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  invoice_fee_to_apply?: InputMaybe<Scalars['Int']['input']>
  invoice_fee_vat?: InputMaybe<Scalars['Int']['input']>
  invoice_number?: InputMaybe<Scalars['Int']['input']>
  is_invoice_fee_appliable?: InputMaybe<Scalars['Boolean']['input']>
  letter_code?: InputMaybe<Scalars['String']['input']>
  meddelande_or_ocr?: InputMaybe<Scalars['String']['input']>
  order_number?: InputMaybe<Scalars['Int']['input']>
  purchase_invoice_number?: InputMaybe<Scalars['String']['input']>
  reminder_number?: InputMaybe<Scalars['Int']['input']>
  supplier_invoice_id?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type companies_stddev_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "companies" */
export type companies_stddev_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type companies_stddev_pop_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "companies" */
export type companies_stddev_pop_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type companies_stddev_samp_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "companies" */
export type companies_stddev_samp_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type companies_sum_fields = {
  cid_first_group?: Maybe<Scalars['Int']['output']>
  cid_second_group?: Maybe<Scalars['Int']['output']>
  dispatch_number?: Maybe<Scalars['Int']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Int']['output']>
  invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  invoice_number?: Maybe<Scalars['Int']['output']>
  order_number?: Maybe<Scalars['Int']['output']>
  reminder_number?: Maybe<Scalars['Int']['output']>
  supplier_invoice_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "companies" */
export type companies_sum_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** update columns of table "companies" */
export type companies_update_column =
  /** column name */
  | 'about_us_64base'
  /** column name */
  | 'bic_code'
  /** column name */
  | 'cid_first_group'
  /** column name */
  | 'cid_second_group'
  /** column name */
  | 'company_address_line_1'
  /** column name */
  | 'company_address_line_2'
  /** column name */
  | 'company_bank_giro'
  /** column name */
  | 'company_city'
  /** column name */
  | 'company_country'
  /** column name */
  | 'company_customer_service_email'
  /** column name */
  | 'company_customer_service_tel'
  /** column name */
  | 'company_email'
  /** column name */
  | 'company_finans_email'
  /** column name */
  | 'company_finans_tel'
  /** column name */
  | 'company_image_link'
  /** column name */
  | 'company_is_active'
  /** column name */
  | 'company_logo_64base'
  /** column name */
  | 'company_name'
  /** column name */
  | 'company_nickname'
  /** column name */
  | 'company_order_email'
  /** column name */
  | 'company_order_tel'
  /** column name */
  | 'company_org_num'
  /** column name */
  | 'company_post_code'
  /** column name */
  | 'company_reference'
  /** column name */
  | 'company_state'
  /** column name */
  | 'company_tel'
  /** column name */
  | 'company_watermark_64base'
  /** column name */
  | 'dispatch_number'
  /** column name */
  | 'iban_code'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'invoice_fee_to_apply'
  /** column name */
  | 'invoice_fee_vat'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'is_invoice_fee_appliable'
  /** column name */
  | 'letter_code'
  /** column name */
  | 'meddelande_or_ocr'
  /** column name */
  | 'order_number'
  /** column name */
  | 'purchase_invoice_number'
  /** column name */
  | 'reminder_number'
  /** column name */
  | 'supplier_invoice_id'

/** aggregate var_pop on columns */
export type companies_var_pop_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "companies" */
export type companies_var_pop_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type companies_var_samp_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "companies" */
export type companies_var_samp_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type companies_variance_fields = {
  cid_first_group?: Maybe<Scalars['Float']['output']>
  cid_second_group?: Maybe<Scalars['Float']['output']>
  dispatch_number?: Maybe<Scalars['Float']['output']>
  invoice_fee_to_apply?: Maybe<Scalars['Float']['output']>
  invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  invoice_number?: Maybe<Scalars['Float']['output']>
  order_number?: Maybe<Scalars['Float']['output']>
  reminder_number?: Maybe<Scalars['Float']['output']>
  supplier_invoice_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "companies" */
export type companies_variance_order_by = {
  cid_first_group?: InputMaybe<order_by>
  cid_second_group?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_fee_to_apply?: InputMaybe<order_by>
  invoice_fee_vat?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  reminder_number?: InputMaybe<order_by>
  supplier_invoice_id?: InputMaybe<order_by>
}

/** columns and relationships of "customer_bookmarks" */
export type customer_bookmarks = {
  company_id: Scalars['String']['output']
  customer_id: Scalars['String']['output']
  is_bookmarked: Scalars['Boolean']['output']
  stock_id: Scalars['String']['output']
}

/** aggregated selection of "customer_bookmarks" */
export type customer_bookmarks_aggregate = {
  aggregate?: Maybe<customer_bookmarks_aggregate_fields>
  nodes: Array<customer_bookmarks>
}

/** aggregate fields of "customer_bookmarks" */
export type customer_bookmarks_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<customer_bookmarks_max_fields>
  min?: Maybe<customer_bookmarks_min_fields>
}

/** aggregate fields of "customer_bookmarks" */
export type customer_bookmarks_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<customer_bookmarks_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "customer_bookmarks" */
export type customer_bookmarks_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<customer_bookmarks_max_order_by>
  min?: InputMaybe<customer_bookmarks_min_order_by>
}

/** input type for inserting array relation for remote table "customer_bookmarks" */
export type customer_bookmarks_arr_rel_insert_input = {
  data: Array<customer_bookmarks_insert_input>
  on_conflict?: InputMaybe<customer_bookmarks_on_conflict>
}

/** Boolean expression to filter rows from the table "customer_bookmarks". All fields are combined with a logical 'AND'. */
export type customer_bookmarks_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<customer_bookmarks_bool_exp>>>
  _not?: InputMaybe<customer_bookmarks_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<customer_bookmarks_bool_exp>>>
  company_id?: InputMaybe<String_comparison_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  is_bookmarked?: InputMaybe<Boolean_comparison_exp>
  stock_id?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "customer_bookmarks" */
export type customer_bookmarks_constraint =
  /** unique or primary key constraint */
  'customer_bookmarks_pkey'

/** input type for inserting data into table "customer_bookmarks" */
export type customer_bookmarks_insert_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  is_bookmarked?: InputMaybe<Scalars['Boolean']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type customer_bookmarks_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "customer_bookmarks" */
export type customer_bookmarks_max_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type customer_bookmarks_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "customer_bookmarks" */
export type customer_bookmarks_min_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "customer_bookmarks" */
export type customer_bookmarks_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<customer_bookmarks>
}

/** input type for inserting object relation for remote table "customer_bookmarks" */
export type customer_bookmarks_obj_rel_insert_input = {
  data: customer_bookmarks_insert_input
  on_conflict?: InputMaybe<customer_bookmarks_on_conflict>
}

/** on conflict condition type for table "customer_bookmarks" */
export type customer_bookmarks_on_conflict = {
  constraint: customer_bookmarks_constraint
  update_columns: Array<customer_bookmarks_update_column>
  where?: InputMaybe<customer_bookmarks_bool_exp>
}

/** ordering options when selecting data from "customer_bookmarks" */
export type customer_bookmarks_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  is_bookmarked?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
}

/** select columns of table "customer_bookmarks" */
export type customer_bookmarks_select_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'is_bookmarked'
  /** column name */
  | 'stock_id'

/** input type for updating data in table "customer_bookmarks" */
export type customer_bookmarks_set_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  is_bookmarked?: InputMaybe<Scalars['Boolean']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "customer_bookmarks" */
export type customer_bookmarks_update_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'is_bookmarked'
  /** column name */
  | 'stock_id'

/** columns and relationships of "customer_price_list" */
export type customer_price_list = {
  /** An object relationship */
  company: companies
  company_id: Scalars['String']['output']
  /** An object relationship */
  customer: customers
  customer_id: Scalars['String']['output']
  customers_price: Scalars['Int']['output']
  /** An object relationship */
  stock?: Maybe<stock>
  stock_id: Scalars['String']['output']
}

/** aggregated selection of "customer_price_list" */
export type customer_price_list_aggregate = {
  aggregate?: Maybe<customer_price_list_aggregate_fields>
  nodes: Array<customer_price_list>
}

/** aggregate fields of "customer_price_list" */
export type customer_price_list_aggregate_fields = {
  avg?: Maybe<customer_price_list_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<customer_price_list_max_fields>
  min?: Maybe<customer_price_list_min_fields>
  stddev?: Maybe<customer_price_list_stddev_fields>
  stddev_pop?: Maybe<customer_price_list_stddev_pop_fields>
  stddev_samp?: Maybe<customer_price_list_stddev_samp_fields>
  sum?: Maybe<customer_price_list_sum_fields>
  var_pop?: Maybe<customer_price_list_var_pop_fields>
  var_samp?: Maybe<customer_price_list_var_samp_fields>
  variance?: Maybe<customer_price_list_variance_fields>
}

/** aggregate fields of "customer_price_list" */
export type customer_price_list_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<customer_price_list_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "customer_price_list" */
export type customer_price_list_aggregate_order_by = {
  avg?: InputMaybe<customer_price_list_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<customer_price_list_max_order_by>
  min?: InputMaybe<customer_price_list_min_order_by>
  stddev?: InputMaybe<customer_price_list_stddev_order_by>
  stddev_pop?: InputMaybe<customer_price_list_stddev_pop_order_by>
  stddev_samp?: InputMaybe<customer_price_list_stddev_samp_order_by>
  sum?: InputMaybe<customer_price_list_sum_order_by>
  var_pop?: InputMaybe<customer_price_list_var_pop_order_by>
  var_samp?: InputMaybe<customer_price_list_var_samp_order_by>
  variance?: InputMaybe<customer_price_list_variance_order_by>
}

/** input type for inserting array relation for remote table "customer_price_list" */
export type customer_price_list_arr_rel_insert_input = {
  data: Array<customer_price_list_insert_input>
  on_conflict?: InputMaybe<customer_price_list_on_conflict>
}

/** aggregate avg on columns */
export type customer_price_list_avg_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "customer_price_list" */
export type customer_price_list_avg_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "customer_price_list". All fields are combined with a logical 'AND'. */
export type customer_price_list_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<customer_price_list_bool_exp>>>
  _not?: InputMaybe<customer_price_list_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<customer_price_list_bool_exp>>>
  company?: InputMaybe<companies_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  customer?: InputMaybe<customers_bool_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  customers_price?: InputMaybe<Int_comparison_exp>
  stock?: InputMaybe<stock_bool_exp>
  stock_id?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "customer_price_list" */
export type customer_price_list_constraint =
  /** unique or primary key constraint */
  'customer_price_list_pkey'

/** input type for incrementing integer columne in table "customer_price_list" */
export type customer_price_list_inc_input = {
  customers_price?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "customer_price_list" */
export type customer_price_list_insert_input = {
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  customer?: InputMaybe<customers_obj_rel_insert_input>
  customer_id?: InputMaybe<Scalars['String']['input']>
  customers_price?: InputMaybe<Scalars['Int']['input']>
  stock?: InputMaybe<stock_obj_rel_insert_input>
  stock_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type customer_price_list_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  customers_price?: Maybe<Scalars['Int']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "customer_price_list" */
export type customer_price_list_max_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  customers_price?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type customer_price_list_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  customers_price?: Maybe<Scalars['Int']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "customer_price_list" */
export type customer_price_list_min_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  customers_price?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "customer_price_list" */
export type customer_price_list_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<customer_price_list>
}

/** input type for inserting object relation for remote table "customer_price_list" */
export type customer_price_list_obj_rel_insert_input = {
  data: customer_price_list_insert_input
  on_conflict?: InputMaybe<customer_price_list_on_conflict>
}

/** on conflict condition type for table "customer_price_list" */
export type customer_price_list_on_conflict = {
  constraint: customer_price_list_constraint
  update_columns: Array<customer_price_list_update_column>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** ordering options when selecting data from "customer_price_list" */
export type customer_price_list_order_by = {
  company?: InputMaybe<companies_order_by>
  company_id?: InputMaybe<order_by>
  customer?: InputMaybe<customers_order_by>
  customer_id?: InputMaybe<order_by>
  customers_price?: InputMaybe<order_by>
  stock?: InputMaybe<stock_order_by>
  stock_id?: InputMaybe<order_by>
}

/** select columns of table "customer_price_list" */
export type customer_price_list_select_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'customers_price'
  /** column name */
  | 'stock_id'

/** input type for updating data in table "customer_price_list" */
export type customer_price_list_set_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  customers_price?: InputMaybe<Scalars['Int']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type customer_price_list_stddev_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "customer_price_list" */
export type customer_price_list_stddev_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type customer_price_list_stddev_pop_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "customer_price_list" */
export type customer_price_list_stddev_pop_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type customer_price_list_stddev_samp_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "customer_price_list" */
export type customer_price_list_stddev_samp_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type customer_price_list_sum_fields = {
  customers_price?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "customer_price_list" */
export type customer_price_list_sum_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** update columns of table "customer_price_list" */
export type customer_price_list_update_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'customers_price'
  /** column name */
  | 'stock_id'

/** aggregate var_pop on columns */
export type customer_price_list_var_pop_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "customer_price_list" */
export type customer_price_list_var_pop_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type customer_price_list_var_samp_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "customer_price_list" */
export type customer_price_list_var_samp_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type customer_price_list_variance_fields = {
  customers_price?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "customer_price_list" */
export type customer_price_list_variance_order_by = {
  customers_price?: InputMaybe<order_by>
}

/** columns and relationships of "customers" */
export type customers = {
  /** An array relationship */
  _addresses: Array<addresses>
  /** An aggregated array relationship */
  _addresses_aggregate: addresses_aggregate
  /** An array relationship */
  _document_transactions: Array<document_transactions>
  /** An aggregated array relationship */
  _document_transactions_aggregate: document_transactions_aggregate
  /** An object relationship */
  address?: Maybe<addresses>
  /** An array relationship */
  addresses_customer_rel: Array<addresses>
  /** An aggregated array relationship */
  addresses_customer_rel_aggregate: addresses_aggregate
  company_id: Scalars['String']['output']
  /** An array relationship */
  customer_address_rel: Array<addresses>
  /** An aggregated array relationship */
  customer_address_rel_aggregate: addresses_aggregate
  customer_consumed_products?: Maybe<Scalars['String']['output']>
  customer_credit_limit: Scalars['Int']['output']
  /** An object relationship */
  customer_customer_rel?: Maybe<customers>
  customer_discount_percent: Scalars['Int']['output']
  /** An array relationship */
  customer_document_transactions_rel: Array<document_transactions>
  /** An aggregated array relationship */
  customer_document_transactions_rel_aggregate: document_transactions_aggregate
  customer_email?: Maybe<Scalars['String']['output']>
  customer_id: Scalars['String']['output']
  customer_invoice_rule?: Maybe<Scalars['String']['output']>
  customer_is_active: Scalars['Boolean']['output']
  customer_is_risky: Scalars['Boolean']['output']
  customer_log?: Maybe<Scalars['String']['output']>
  customer_main_company_id?: Maybe<Scalars['String']['output']>
  customer_nickname: Scalars['String']['output']
  customer_org_num: Scalars['String']['output']
  customer_price_class: Scalars['String']['output']
  /** An array relationship */
  customer_price_lists: Array<customer_price_list>
  /** An aggregated array relationship */
  customer_price_lists_aggregate: customer_price_list_aggregate
  customer_reference?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  customer_reminder_lines_rel: Array<reminder_lines>
  /** An aggregated array relationship */
  customer_reminder_lines_rel_aggregate: reminder_lines_aggregate
  customer_term?: Maybe<Scalars['Int']['output']>
  customer_title?: Maybe<Scalars['String']['output']>
  customer_type: Scalars['String']['output']
  /** An array relationship */
  dispatch_headers: Array<dispatch_headers>
  /** An aggregated array relationship */
  dispatch_headers_aggregate: dispatch_headers_aggregate
  /** An array relationship */
  document_transactions: Array<document_transactions>
  /** An aggregated array relationship */
  document_transactions_aggregate: document_transactions_aggregate
  is_customer_potential_reject_us: Scalars['Boolean']['output']
  is_customer_potential_visitable: Scalars['Boolean']['output']
  is_customer_rejected_permenantly: Scalars['Boolean']['output']
  /** An array relationship */
  order_headers: Array<order_headers>
  /** An aggregated array relationship */
  order_headers_aggregate: order_headers_aggregate
  /** An array relationship */
  reminder_headers_customer_rel: Array<reminder_headers>
  /** An aggregated array relationship */
  reminder_headers_customer_rel_aggregate: reminder_headers_aggregate
  send_invoice_by: Scalars['String']['output']
  /** An array relationship */
  telephones: Array<telephones>
  /** An aggregated array relationship */
  telephones_aggregate: telephones_aggregate
}

/** columns and relationships of "customers" */
export type customers_addressesArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "customers" */
export type customers_addresses_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "customers" */
export type customers_document_transactionsArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "customers" */
export type customers_document_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "customers" */
export type customersaddresses_customer_relArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "customers" */
export type customersaddresses_customer_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_address_relArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_address_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_document_transactions_relArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_document_transactions_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_price_listsArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_price_lists_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_reminder_lines_relArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "customers" */
export type customerscustomer_reminder_lines_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "customers" */
export type customersdispatch_headersArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** columns and relationships of "customers" */
export type customersdispatch_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** columns and relationships of "customers" */
export type customersdocument_transactionsArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "customers" */
export type customersdocument_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "customers" */
export type customersorder_headersArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** columns and relationships of "customers" */
export type customersorder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** columns and relationships of "customers" */
export type customersreminder_headers_customer_relArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** columns and relationships of "customers" */
export type customersreminder_headers_customer_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** columns and relationships of "customers" */
export type customerstelephonesArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** columns and relationships of "customers" */
export type customerstelephones_aggregateArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** aggregated selection of "customers" */
export type customers_aggregate = {
  aggregate?: Maybe<customers_aggregate_fields>
  nodes: Array<customers>
}

/** aggregate fields of "customers" */
export type customers_aggregate_fields = {
  avg?: Maybe<customers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<customers_max_fields>
  min?: Maybe<customers_min_fields>
  stddev?: Maybe<customers_stddev_fields>
  stddev_pop?: Maybe<customers_stddev_pop_fields>
  stddev_samp?: Maybe<customers_stddev_samp_fields>
  sum?: Maybe<customers_sum_fields>
  var_pop?: Maybe<customers_var_pop_fields>
  var_samp?: Maybe<customers_var_samp_fields>
  variance?: Maybe<customers_variance_fields>
}

/** aggregate fields of "customers" */
export type customers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<customers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "customers" */
export type customers_aggregate_order_by = {
  avg?: InputMaybe<customers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<customers_max_order_by>
  min?: InputMaybe<customers_min_order_by>
  stddev?: InputMaybe<customers_stddev_order_by>
  stddev_pop?: InputMaybe<customers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<customers_stddev_samp_order_by>
  sum?: InputMaybe<customers_sum_order_by>
  var_pop?: InputMaybe<customers_var_pop_order_by>
  var_samp?: InputMaybe<customers_var_samp_order_by>
  variance?: InputMaybe<customers_variance_order_by>
}

/** input type for inserting array relation for remote table "customers" */
export type customers_arr_rel_insert_input = {
  data: Array<customers_insert_input>
  on_conflict?: InputMaybe<customers_on_conflict>
}

/** aggregate avg on columns */
export type customers_avg_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "customers" */
export type customers_avg_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "customers". All fields are combined with a logical 'AND'. */
export type customers_bool_exp = {
  _addresses?: InputMaybe<addresses_bool_exp>
  _and?: InputMaybe<Array<InputMaybe<customers_bool_exp>>>
  _document_transactions?: InputMaybe<document_transactions_bool_exp>
  _not?: InputMaybe<customers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<customers_bool_exp>>>
  address?: InputMaybe<addresses_bool_exp>
  addresses_customer_rel?: InputMaybe<addresses_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  customer_address_rel?: InputMaybe<addresses_bool_exp>
  customer_consumed_products?: InputMaybe<String_comparison_exp>
  customer_credit_limit?: InputMaybe<Int_comparison_exp>
  customer_customer_rel?: InputMaybe<customers_bool_exp>
  customer_discount_percent?: InputMaybe<Int_comparison_exp>
  customer_document_transactions_rel?: InputMaybe<document_transactions_bool_exp>
  customer_email?: InputMaybe<String_comparison_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  customer_invoice_rule?: InputMaybe<String_comparison_exp>
  customer_is_active?: InputMaybe<Boolean_comparison_exp>
  customer_is_risky?: InputMaybe<Boolean_comparison_exp>
  customer_log?: InputMaybe<String_comparison_exp>
  customer_main_company_id?: InputMaybe<String_comparison_exp>
  customer_nickname?: InputMaybe<String_comparison_exp>
  customer_org_num?: InputMaybe<String_comparison_exp>
  customer_price_class?: InputMaybe<String_comparison_exp>
  customer_price_lists?: InputMaybe<customer_price_list_bool_exp>
  customer_reference?: InputMaybe<String_comparison_exp>
  customer_reminder_lines_rel?: InputMaybe<reminder_lines_bool_exp>
  customer_term?: InputMaybe<Int_comparison_exp>
  customer_title?: InputMaybe<String_comparison_exp>
  customer_type?: InputMaybe<String_comparison_exp>
  dispatch_headers?: InputMaybe<dispatch_headers_bool_exp>
  document_transactions?: InputMaybe<document_transactions_bool_exp>
  is_customer_potential_reject_us?: InputMaybe<Boolean_comparison_exp>
  is_customer_potential_visitable?: InputMaybe<Boolean_comparison_exp>
  is_customer_rejected_permenantly?: InputMaybe<Boolean_comparison_exp>
  order_headers?: InputMaybe<order_headers_bool_exp>
  reminder_headers_customer_rel?: InputMaybe<reminder_headers_bool_exp>
  send_invoice_by?: InputMaybe<String_comparison_exp>
  telephones?: InputMaybe<telephones_bool_exp>
}

/** unique or primary key constraints on table "customers" */
export type customers_constraint =
  /** unique or primary key constraint */
  | 'customers_customer_id_key'
  /** unique or primary key constraint */
  | 'customers_pkey'

/** input type for incrementing integer columne in table "customers" */
export type customers_inc_input = {
  customer_credit_limit?: InputMaybe<Scalars['Int']['input']>
  customer_discount_percent?: InputMaybe<Scalars['Int']['input']>
  customer_term?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "customers" */
export type customers_insert_input = {
  _addresses?: InputMaybe<addresses_arr_rel_insert_input>
  _document_transactions?: InputMaybe<document_transactions_arr_rel_insert_input>
  address?: InputMaybe<addresses_obj_rel_insert_input>
  addresses_customer_rel?: InputMaybe<addresses_arr_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_address_rel?: InputMaybe<addresses_arr_rel_insert_input>
  customer_consumed_products?: InputMaybe<Scalars['String']['input']>
  customer_credit_limit?: InputMaybe<Scalars['Int']['input']>
  customer_customer_rel?: InputMaybe<customers_obj_rel_insert_input>
  customer_discount_percent?: InputMaybe<Scalars['Int']['input']>
  customer_document_transactions_rel?: InputMaybe<document_transactions_arr_rel_insert_input>
  customer_email?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  customer_invoice_rule?: InputMaybe<Scalars['String']['input']>
  customer_is_active?: InputMaybe<Scalars['Boolean']['input']>
  customer_is_risky?: InputMaybe<Scalars['Boolean']['input']>
  customer_log?: InputMaybe<Scalars['String']['input']>
  customer_main_company_id?: InputMaybe<Scalars['String']['input']>
  customer_nickname?: InputMaybe<Scalars['String']['input']>
  customer_org_num?: InputMaybe<Scalars['String']['input']>
  customer_price_class?: InputMaybe<Scalars['String']['input']>
  customer_price_lists?: InputMaybe<customer_price_list_arr_rel_insert_input>
  customer_reference?: InputMaybe<Scalars['String']['input']>
  customer_reminder_lines_rel?: InputMaybe<reminder_lines_arr_rel_insert_input>
  customer_term?: InputMaybe<Scalars['Int']['input']>
  customer_title?: InputMaybe<Scalars['String']['input']>
  customer_type?: InputMaybe<Scalars['String']['input']>
  dispatch_headers?: InputMaybe<dispatch_headers_arr_rel_insert_input>
  document_transactions?: InputMaybe<document_transactions_arr_rel_insert_input>
  is_customer_potential_reject_us?: InputMaybe<Scalars['Boolean']['input']>
  is_customer_potential_visitable?: InputMaybe<Scalars['Boolean']['input']>
  is_customer_rejected_permenantly?: InputMaybe<Scalars['Boolean']['input']>
  order_headers?: InputMaybe<order_headers_arr_rel_insert_input>
  reminder_headers_customer_rel?: InputMaybe<reminder_headers_arr_rel_insert_input>
  send_invoice_by?: InputMaybe<Scalars['String']['input']>
  telephones?: InputMaybe<telephones_arr_rel_insert_input>
}

/** aggregate max on columns */
export type customers_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_consumed_products?: Maybe<Scalars['String']['output']>
  customer_credit_limit?: Maybe<Scalars['Int']['output']>
  customer_discount_percent?: Maybe<Scalars['Int']['output']>
  customer_email?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  customer_invoice_rule?: Maybe<Scalars['String']['output']>
  customer_log?: Maybe<Scalars['String']['output']>
  customer_main_company_id?: Maybe<Scalars['String']['output']>
  customer_nickname?: Maybe<Scalars['String']['output']>
  customer_org_num?: Maybe<Scalars['String']['output']>
  customer_price_class?: Maybe<Scalars['String']['output']>
  customer_reference?: Maybe<Scalars['String']['output']>
  customer_term?: Maybe<Scalars['Int']['output']>
  customer_title?: Maybe<Scalars['String']['output']>
  customer_type?: Maybe<Scalars['String']['output']>
  send_invoice_by?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "customers" */
export type customers_max_order_by = {
  company_id?: InputMaybe<order_by>
  customer_consumed_products?: InputMaybe<order_by>
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_email?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  customer_invoice_rule?: InputMaybe<order_by>
  customer_log?: InputMaybe<order_by>
  customer_main_company_id?: InputMaybe<order_by>
  customer_nickname?: InputMaybe<order_by>
  customer_org_num?: InputMaybe<order_by>
  customer_price_class?: InputMaybe<order_by>
  customer_reference?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
  customer_title?: InputMaybe<order_by>
  customer_type?: InputMaybe<order_by>
  send_invoice_by?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type customers_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_consumed_products?: Maybe<Scalars['String']['output']>
  customer_credit_limit?: Maybe<Scalars['Int']['output']>
  customer_discount_percent?: Maybe<Scalars['Int']['output']>
  customer_email?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  customer_invoice_rule?: Maybe<Scalars['String']['output']>
  customer_log?: Maybe<Scalars['String']['output']>
  customer_main_company_id?: Maybe<Scalars['String']['output']>
  customer_nickname?: Maybe<Scalars['String']['output']>
  customer_org_num?: Maybe<Scalars['String']['output']>
  customer_price_class?: Maybe<Scalars['String']['output']>
  customer_reference?: Maybe<Scalars['String']['output']>
  customer_term?: Maybe<Scalars['Int']['output']>
  customer_title?: Maybe<Scalars['String']['output']>
  customer_type?: Maybe<Scalars['String']['output']>
  send_invoice_by?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "customers" */
export type customers_min_order_by = {
  company_id?: InputMaybe<order_by>
  customer_consumed_products?: InputMaybe<order_by>
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_email?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  customer_invoice_rule?: InputMaybe<order_by>
  customer_log?: InputMaybe<order_by>
  customer_main_company_id?: InputMaybe<order_by>
  customer_nickname?: InputMaybe<order_by>
  customer_org_num?: InputMaybe<order_by>
  customer_price_class?: InputMaybe<order_by>
  customer_reference?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
  customer_title?: InputMaybe<order_by>
  customer_type?: InputMaybe<order_by>
  send_invoice_by?: InputMaybe<order_by>
}

/** response of any mutation on the table "customers" */
export type customers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<customers>
}

/** input type for inserting object relation for remote table "customers" */
export type customers_obj_rel_insert_input = {
  data: customers_insert_input
  on_conflict?: InputMaybe<customers_on_conflict>
}

/** on conflict condition type for table "customers" */
export type customers_on_conflict = {
  constraint: customers_constraint
  update_columns: Array<customers_update_column>
  where?: InputMaybe<customers_bool_exp>
}

/** ordering options when selecting data from "customers" */
export type customers_order_by = {
  _addresses_aggregate?: InputMaybe<addresses_aggregate_order_by>
  _document_transactions_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  address?: InputMaybe<addresses_order_by>
  addresses_customer_rel_aggregate?: InputMaybe<addresses_aggregate_order_by>
  company_id?: InputMaybe<order_by>
  customer_address_rel_aggregate?: InputMaybe<addresses_aggregate_order_by>
  customer_consumed_products?: InputMaybe<order_by>
  customer_credit_limit?: InputMaybe<order_by>
  customer_customer_rel?: InputMaybe<customers_order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_document_transactions_rel_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  customer_email?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  customer_invoice_rule?: InputMaybe<order_by>
  customer_is_active?: InputMaybe<order_by>
  customer_is_risky?: InputMaybe<order_by>
  customer_log?: InputMaybe<order_by>
  customer_main_company_id?: InputMaybe<order_by>
  customer_nickname?: InputMaybe<order_by>
  customer_org_num?: InputMaybe<order_by>
  customer_price_class?: InputMaybe<order_by>
  customer_price_lists_aggregate?: InputMaybe<customer_price_list_aggregate_order_by>
  customer_reference?: InputMaybe<order_by>
  customer_reminder_lines_rel_aggregate?: InputMaybe<reminder_lines_aggregate_order_by>
  customer_term?: InputMaybe<order_by>
  customer_title?: InputMaybe<order_by>
  customer_type?: InputMaybe<order_by>
  dispatch_headers_aggregate?: InputMaybe<dispatch_headers_aggregate_order_by>
  document_transactions_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  is_customer_potential_reject_us?: InputMaybe<order_by>
  is_customer_potential_visitable?: InputMaybe<order_by>
  is_customer_rejected_permenantly?: InputMaybe<order_by>
  order_headers_aggregate?: InputMaybe<order_headers_aggregate_order_by>
  reminder_headers_customer_rel_aggregate?: InputMaybe<reminder_headers_aggregate_order_by>
  send_invoice_by?: InputMaybe<order_by>
  telephones_aggregate?: InputMaybe<telephones_aggregate_order_by>
}

/** select columns of table "customers" */
export type customers_select_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_consumed_products'
  /** column name */
  | 'customer_credit_limit'
  /** column name */
  | 'customer_discount_percent'
  /** column name */
  | 'customer_email'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'customer_invoice_rule'
  /** column name */
  | 'customer_is_active'
  /** column name */
  | 'customer_is_risky'
  /** column name */
  | 'customer_log'
  /** column name */
  | 'customer_main_company_id'
  /** column name */
  | 'customer_nickname'
  /** column name */
  | 'customer_org_num'
  /** column name */
  | 'customer_price_class'
  /** column name */
  | 'customer_reference'
  /** column name */
  | 'customer_term'
  /** column name */
  | 'customer_title'
  /** column name */
  | 'customer_type'
  /** column name */
  | 'is_customer_potential_reject_us'
  /** column name */
  | 'is_customer_potential_visitable'
  /** column name */
  | 'is_customer_rejected_permenantly'
  /** column name */
  | 'send_invoice_by'

/** input type for updating data in table "customers" */
export type customers_set_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_consumed_products?: InputMaybe<Scalars['String']['input']>
  customer_credit_limit?: InputMaybe<Scalars['Int']['input']>
  customer_discount_percent?: InputMaybe<Scalars['Int']['input']>
  customer_email?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  customer_invoice_rule?: InputMaybe<Scalars['String']['input']>
  customer_is_active?: InputMaybe<Scalars['Boolean']['input']>
  customer_is_risky?: InputMaybe<Scalars['Boolean']['input']>
  customer_log?: InputMaybe<Scalars['String']['input']>
  customer_main_company_id?: InputMaybe<Scalars['String']['input']>
  customer_nickname?: InputMaybe<Scalars['String']['input']>
  customer_org_num?: InputMaybe<Scalars['String']['input']>
  customer_price_class?: InputMaybe<Scalars['String']['input']>
  customer_reference?: InputMaybe<Scalars['String']['input']>
  customer_term?: InputMaybe<Scalars['Int']['input']>
  customer_title?: InputMaybe<Scalars['String']['input']>
  customer_type?: InputMaybe<Scalars['String']['input']>
  is_customer_potential_reject_us?: InputMaybe<Scalars['Boolean']['input']>
  is_customer_potential_visitable?: InputMaybe<Scalars['Boolean']['input']>
  is_customer_rejected_permenantly?: InputMaybe<Scalars['Boolean']['input']>
  send_invoice_by?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type customers_stddev_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "customers" */
export type customers_stddev_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type customers_stddev_pop_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "customers" */
export type customers_stddev_pop_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type customers_stddev_samp_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "customers" */
export type customers_stddev_samp_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type customers_sum_fields = {
  customer_credit_limit?: Maybe<Scalars['Int']['output']>
  customer_discount_percent?: Maybe<Scalars['Int']['output']>
  customer_term?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "customers" */
export type customers_sum_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** update columns of table "customers" */
export type customers_update_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_consumed_products'
  /** column name */
  | 'customer_credit_limit'
  /** column name */
  | 'customer_discount_percent'
  /** column name */
  | 'customer_email'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'customer_invoice_rule'
  /** column name */
  | 'customer_is_active'
  /** column name */
  | 'customer_is_risky'
  /** column name */
  | 'customer_log'
  /** column name */
  | 'customer_main_company_id'
  /** column name */
  | 'customer_nickname'
  /** column name */
  | 'customer_org_num'
  /** column name */
  | 'customer_price_class'
  /** column name */
  | 'customer_reference'
  /** column name */
  | 'customer_term'
  /** column name */
  | 'customer_title'
  /** column name */
  | 'customer_type'
  /** column name */
  | 'is_customer_potential_reject_us'
  /** column name */
  | 'is_customer_potential_visitable'
  /** column name */
  | 'is_customer_rejected_permenantly'
  /** column name */
  | 'send_invoice_by'

/** aggregate var_pop on columns */
export type customers_var_pop_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "customers" */
export type customers_var_pop_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type customers_var_samp_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "customers" */
export type customers_var_samp_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type customers_variance_fields = {
  customer_credit_limit?: Maybe<Scalars['Float']['output']>
  customer_discount_percent?: Maybe<Scalars['Float']['output']>
  customer_term?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "customers" */
export type customers_variance_order_by = {
  customer_credit_limit?: InputMaybe<order_by>
  customer_discount_percent?: InputMaybe<order_by>
  customer_term?: InputMaybe<order_by>
}

/** columns and relationships of "customers_visits" */
export type customers_visits = {
  /** An object relationship */
  _adresses?: Maybe<addresses>
  /** An object relationship */
  _companies?: Maybe<companies>
  /** An object relationship */
  _customers?: Maybe<customers>
  address_id?: Maybe<Scalars['uuid']['output']>
  company_id: Scalars['String']['output']
  customer_id: Scalars['String']['output']
  is_alarm_active?: Maybe<Scalars['Boolean']['output']>
  is_customer_visited?: Maybe<Scalars['Boolean']['output']>
  visit_alarm_date?: Maybe<Scalars['date']['output']>
  visit_alarm_notes?: Maybe<Scalars['String']['output']>
  visit_date?: Maybe<Scalars['date']['output']>
  visit_id: Scalars['Int']['output']
  visit_notes?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "customers_visits" */
export type customers_visits_aggregate = {
  aggregate?: Maybe<customers_visits_aggregate_fields>
  nodes: Array<customers_visits>
}

/** aggregate fields of "customers_visits" */
export type customers_visits_aggregate_fields = {
  avg?: Maybe<customers_visits_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<customers_visits_max_fields>
  min?: Maybe<customers_visits_min_fields>
  stddev?: Maybe<customers_visits_stddev_fields>
  stddev_pop?: Maybe<customers_visits_stddev_pop_fields>
  stddev_samp?: Maybe<customers_visits_stddev_samp_fields>
  sum?: Maybe<customers_visits_sum_fields>
  var_pop?: Maybe<customers_visits_var_pop_fields>
  var_samp?: Maybe<customers_visits_var_samp_fields>
  variance?: Maybe<customers_visits_variance_fields>
}

/** aggregate fields of "customers_visits" */
export type customers_visits_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<customers_visits_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "customers_visits" */
export type customers_visits_aggregate_order_by = {
  avg?: InputMaybe<customers_visits_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<customers_visits_max_order_by>
  min?: InputMaybe<customers_visits_min_order_by>
  stddev?: InputMaybe<customers_visits_stddev_order_by>
  stddev_pop?: InputMaybe<customers_visits_stddev_pop_order_by>
  stddev_samp?: InputMaybe<customers_visits_stddev_samp_order_by>
  sum?: InputMaybe<customers_visits_sum_order_by>
  var_pop?: InputMaybe<customers_visits_var_pop_order_by>
  var_samp?: InputMaybe<customers_visits_var_samp_order_by>
  variance?: InputMaybe<customers_visits_variance_order_by>
}

/** input type for inserting array relation for remote table "customers_visits" */
export type customers_visits_arr_rel_insert_input = {
  data: Array<customers_visits_insert_input>
  on_conflict?: InputMaybe<customers_visits_on_conflict>
}

/** aggregate avg on columns */
export type customers_visits_avg_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "customers_visits" */
export type customers_visits_avg_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "customers_visits". All fields are combined with a logical 'AND'. */
export type customers_visits_bool_exp = {
  _adresses?: InputMaybe<addresses_bool_exp>
  _and?: InputMaybe<Array<InputMaybe<customers_visits_bool_exp>>>
  _companies?: InputMaybe<companies_bool_exp>
  _customers?: InputMaybe<customers_bool_exp>
  _not?: InputMaybe<customers_visits_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<customers_visits_bool_exp>>>
  address_id?: InputMaybe<uuid_comparison_exp>
  company_id?: InputMaybe<String_comparison_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  is_alarm_active?: InputMaybe<Boolean_comparison_exp>
  is_customer_visited?: InputMaybe<Boolean_comparison_exp>
  visit_alarm_date?: InputMaybe<date_comparison_exp>
  visit_alarm_notes?: InputMaybe<String_comparison_exp>
  visit_date?: InputMaybe<date_comparison_exp>
  visit_id?: InputMaybe<Int_comparison_exp>
  visit_notes?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "customers_visits" */
export type customers_visits_constraint =
  /** unique or primary key constraint */
  | 'customers_visits_visit_id_key'
  /** unique or primary key constraint */
  | 'potential_customers_visits_pkey'

/** input type for incrementing integer columne in table "customers_visits" */
export type customers_visits_inc_input = {
  visit_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "customers_visits" */
export type customers_visits_insert_input = {
  _adresses?: InputMaybe<addresses_obj_rel_insert_input>
  _companies?: InputMaybe<companies_obj_rel_insert_input>
  _customers?: InputMaybe<customers_obj_rel_insert_input>
  address_id?: InputMaybe<Scalars['uuid']['input']>
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  is_alarm_active?: InputMaybe<Scalars['Boolean']['input']>
  is_customer_visited?: InputMaybe<Scalars['Boolean']['input']>
  visit_alarm_date?: InputMaybe<Scalars['date']['input']>
  visit_alarm_notes?: InputMaybe<Scalars['String']['input']>
  visit_date?: InputMaybe<Scalars['date']['input']>
  visit_id?: InputMaybe<Scalars['Int']['input']>
  visit_notes?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type customers_visits_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  visit_alarm_date?: Maybe<Scalars['date']['output']>
  visit_alarm_notes?: Maybe<Scalars['String']['output']>
  visit_date?: Maybe<Scalars['date']['output']>
  visit_id?: Maybe<Scalars['Int']['output']>
  visit_notes?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "customers_visits" */
export type customers_visits_max_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  visit_alarm_date?: InputMaybe<order_by>
  visit_alarm_notes?: InputMaybe<order_by>
  visit_date?: InputMaybe<order_by>
  visit_id?: InputMaybe<order_by>
  visit_notes?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type customers_visits_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  visit_alarm_date?: Maybe<Scalars['date']['output']>
  visit_alarm_notes?: Maybe<Scalars['String']['output']>
  visit_date?: Maybe<Scalars['date']['output']>
  visit_id?: Maybe<Scalars['Int']['output']>
  visit_notes?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "customers_visits" */
export type customers_visits_min_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  visit_alarm_date?: InputMaybe<order_by>
  visit_alarm_notes?: InputMaybe<order_by>
  visit_date?: InputMaybe<order_by>
  visit_id?: InputMaybe<order_by>
  visit_notes?: InputMaybe<order_by>
}

/** response of any mutation on the table "customers_visits" */
export type customers_visits_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<customers_visits>
}

/** input type for inserting object relation for remote table "customers_visits" */
export type customers_visits_obj_rel_insert_input = {
  data: customers_visits_insert_input
  on_conflict?: InputMaybe<customers_visits_on_conflict>
}

/** on conflict condition type for table "customers_visits" */
export type customers_visits_on_conflict = {
  constraint: customers_visits_constraint
  update_columns: Array<customers_visits_update_column>
  where?: InputMaybe<customers_visits_bool_exp>
}

/** ordering options when selecting data from "customers_visits" */
export type customers_visits_order_by = {
  _adresses?: InputMaybe<addresses_order_by>
  _companies?: InputMaybe<companies_order_by>
  _customers?: InputMaybe<customers_order_by>
  address_id?: InputMaybe<order_by>
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  is_alarm_active?: InputMaybe<order_by>
  is_customer_visited?: InputMaybe<order_by>
  visit_alarm_date?: InputMaybe<order_by>
  visit_alarm_notes?: InputMaybe<order_by>
  visit_date?: InputMaybe<order_by>
  visit_id?: InputMaybe<order_by>
  visit_notes?: InputMaybe<order_by>
}

/** select columns of table "customers_visits" */
export type customers_visits_select_column =
  /** column name */
  | 'address_id'
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'is_alarm_active'
  /** column name */
  | 'is_customer_visited'
  /** column name */
  | 'visit_alarm_date'
  /** column name */
  | 'visit_alarm_notes'
  /** column name */
  | 'visit_date'
  /** column name */
  | 'visit_id'
  /** column name */
  | 'visit_notes'

/** input type for updating data in table "customers_visits" */
export type customers_visits_set_input = {
  address_id?: InputMaybe<Scalars['uuid']['input']>
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  is_alarm_active?: InputMaybe<Scalars['Boolean']['input']>
  is_customer_visited?: InputMaybe<Scalars['Boolean']['input']>
  visit_alarm_date?: InputMaybe<Scalars['date']['input']>
  visit_alarm_notes?: InputMaybe<Scalars['String']['input']>
  visit_date?: InputMaybe<Scalars['date']['input']>
  visit_id?: InputMaybe<Scalars['Int']['input']>
  visit_notes?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type customers_visits_stddev_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "customers_visits" */
export type customers_visits_stddev_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type customers_visits_stddev_pop_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "customers_visits" */
export type customers_visits_stddev_pop_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type customers_visits_stddev_samp_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "customers_visits" */
export type customers_visits_stddev_samp_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type customers_visits_sum_fields = {
  visit_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "customers_visits" */
export type customers_visits_sum_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** update columns of table "customers_visits" */
export type customers_visits_update_column =
  /** column name */
  | 'address_id'
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'is_alarm_active'
  /** column name */
  | 'is_customer_visited'
  /** column name */
  | 'visit_alarm_date'
  /** column name */
  | 'visit_alarm_notes'
  /** column name */
  | 'visit_date'
  /** column name */
  | 'visit_id'
  /** column name */
  | 'visit_notes'

/** aggregate var_pop on columns */
export type customers_visits_var_pop_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "customers_visits" */
export type customers_visits_var_pop_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type customers_visits_var_samp_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "customers_visits" */
export type customers_visits_var_samp_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type customers_visits_variance_fields = {
  visit_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "customers_visits" */
export type customers_visits_variance_order_by = {
  visit_id?: InputMaybe<order_by>
}

/** expression to compare columns of type date. All fields are combined with logical 'AND'. */
export type date_comparison_exp = {
  _eq?: InputMaybe<Scalars['date']['input']>
  _gt?: InputMaybe<Scalars['date']['input']>
  _gte?: InputMaybe<Scalars['date']['input']>
  _in?: InputMaybe<Array<Scalars['date']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['date']['input']>
  _lte?: InputMaybe<Scalars['date']['input']>
  _neq?: InputMaybe<Scalars['date']['input']>
  _nin?: InputMaybe<Array<Scalars['date']['input']>>
}

/** columns and relationships of "deliveries" */
export type deliveries = {
  delivered_routes: Scalars['String']['output']
  delivery_date: Scalars['date']['output']
  delivery_driver: Scalars['Int']['output']
  delivery_id: Scalars['Int']['output']
  delivery_vehicle: Scalars['String']['output']
  /** An object relationship */
  driver: drivers
  isDeliveryListLocked: Scalars['Boolean']['output']
  /** An object relationship */
  vehicle: vehicles
}

/** aggregated selection of "deliveries" */
export type deliveries_aggregate = {
  aggregate?: Maybe<deliveries_aggregate_fields>
  nodes: Array<deliveries>
}

/** aggregate fields of "deliveries" */
export type deliveries_aggregate_fields = {
  avg?: Maybe<deliveries_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<deliveries_max_fields>
  min?: Maybe<deliveries_min_fields>
  stddev?: Maybe<deliveries_stddev_fields>
  stddev_pop?: Maybe<deliveries_stddev_pop_fields>
  stddev_samp?: Maybe<deliveries_stddev_samp_fields>
  sum?: Maybe<deliveries_sum_fields>
  var_pop?: Maybe<deliveries_var_pop_fields>
  var_samp?: Maybe<deliveries_var_samp_fields>
  variance?: Maybe<deliveries_variance_fields>
}

/** aggregate fields of "deliveries" */
export type deliveries_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<deliveries_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "deliveries" */
export type deliveries_aggregate_order_by = {
  avg?: InputMaybe<deliveries_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<deliveries_max_order_by>
  min?: InputMaybe<deliveries_min_order_by>
  stddev?: InputMaybe<deliveries_stddev_order_by>
  stddev_pop?: InputMaybe<deliveries_stddev_pop_order_by>
  stddev_samp?: InputMaybe<deliveries_stddev_samp_order_by>
  sum?: InputMaybe<deliveries_sum_order_by>
  var_pop?: InputMaybe<deliveries_var_pop_order_by>
  var_samp?: InputMaybe<deliveries_var_samp_order_by>
  variance?: InputMaybe<deliveries_variance_order_by>
}

/** input type for inserting array relation for remote table "deliveries" */
export type deliveries_arr_rel_insert_input = {
  data: Array<deliveries_insert_input>
  on_conflict?: InputMaybe<deliveries_on_conflict>
}

/** aggregate avg on columns */
export type deliveries_avg_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "deliveries" */
export type deliveries_avg_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "deliveries". All fields are combined with a logical 'AND'. */
export type deliveries_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<deliveries_bool_exp>>>
  _not?: InputMaybe<deliveries_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<deliveries_bool_exp>>>
  delivered_routes?: InputMaybe<String_comparison_exp>
  delivery_date?: InputMaybe<date_comparison_exp>
  delivery_driver?: InputMaybe<Int_comparison_exp>
  delivery_id?: InputMaybe<Int_comparison_exp>
  delivery_vehicle?: InputMaybe<String_comparison_exp>
  driver?: InputMaybe<drivers_bool_exp>
  isDeliveryListLocked?: InputMaybe<Boolean_comparison_exp>
  vehicle?: InputMaybe<vehicles_bool_exp>
}

/** unique or primary key constraints on table "deliveries" */
export type deliveries_constraint =
  /** unique or primary key constraint */
  'delivery_pkey'

/** input type for incrementing integer columne in table "deliveries" */
export type deliveries_inc_input = {
  delivery_driver?: InputMaybe<Scalars['Int']['input']>
  delivery_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "deliveries" */
export type deliveries_insert_input = {
  delivered_routes?: InputMaybe<Scalars['String']['input']>
  delivery_date?: InputMaybe<Scalars['date']['input']>
  delivery_driver?: InputMaybe<Scalars['Int']['input']>
  delivery_id?: InputMaybe<Scalars['Int']['input']>
  delivery_vehicle?: InputMaybe<Scalars['String']['input']>
  driver?: InputMaybe<drivers_obj_rel_insert_input>
  isDeliveryListLocked?: InputMaybe<Scalars['Boolean']['input']>
  vehicle?: InputMaybe<vehicles_obj_rel_insert_input>
}

/** columns and relationships of "deliveries_list_lines" */
export type deliveries_list_lines = {
  delivery_id: Scalars['Int']['output']
  dispatch_id: Scalars['String']['output']
  note?: Maybe<Scalars['String']['output']>
}

/** aggregated selection of "deliveries_list_lines" */
export type deliveries_list_lines_aggregate = {
  aggregate?: Maybe<deliveries_list_lines_aggregate_fields>
  nodes: Array<deliveries_list_lines>
}

/** aggregate fields of "deliveries_list_lines" */
export type deliveries_list_lines_aggregate_fields = {
  avg?: Maybe<deliveries_list_lines_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<deliveries_list_lines_max_fields>
  min?: Maybe<deliveries_list_lines_min_fields>
  stddev?: Maybe<deliveries_list_lines_stddev_fields>
  stddev_pop?: Maybe<deliveries_list_lines_stddev_pop_fields>
  stddev_samp?: Maybe<deliveries_list_lines_stddev_samp_fields>
  sum?: Maybe<deliveries_list_lines_sum_fields>
  var_pop?: Maybe<deliveries_list_lines_var_pop_fields>
  var_samp?: Maybe<deliveries_list_lines_var_samp_fields>
  variance?: Maybe<deliveries_list_lines_variance_fields>
}

/** aggregate fields of "deliveries_list_lines" */
export type deliveries_list_lines_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<deliveries_list_lines_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "deliveries_list_lines" */
export type deliveries_list_lines_aggregate_order_by = {
  avg?: InputMaybe<deliveries_list_lines_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<deliveries_list_lines_max_order_by>
  min?: InputMaybe<deliveries_list_lines_min_order_by>
  stddev?: InputMaybe<deliveries_list_lines_stddev_order_by>
  stddev_pop?: InputMaybe<deliveries_list_lines_stddev_pop_order_by>
  stddev_samp?: InputMaybe<deliveries_list_lines_stddev_samp_order_by>
  sum?: InputMaybe<deliveries_list_lines_sum_order_by>
  var_pop?: InputMaybe<deliveries_list_lines_var_pop_order_by>
  var_samp?: InputMaybe<deliveries_list_lines_var_samp_order_by>
  variance?: InputMaybe<deliveries_list_lines_variance_order_by>
}

/** input type for inserting array relation for remote table "deliveries_list_lines" */
export type deliveries_list_lines_arr_rel_insert_input = {
  data: Array<deliveries_list_lines_insert_input>
  on_conflict?: InputMaybe<deliveries_list_lines_on_conflict>
}

/** aggregate avg on columns */
export type deliveries_list_lines_avg_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_avg_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "deliveries_list_lines". All fields are combined with a logical 'AND'. */
export type deliveries_list_lines_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<deliveries_list_lines_bool_exp>>>
  _not?: InputMaybe<deliveries_list_lines_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<deliveries_list_lines_bool_exp>>>
  delivery_id?: InputMaybe<Int_comparison_exp>
  dispatch_id?: InputMaybe<String_comparison_exp>
  note?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "deliveries_list_lines" */
export type deliveries_list_lines_constraint =
  /** unique or primary key constraint */
  'deliveries_list_lines_pkey'

/** input type for incrementing integer columne in table "deliveries_list_lines" */
export type deliveries_list_lines_inc_input = {
  delivery_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "deliveries_list_lines" */
export type deliveries_list_lines_insert_input = {
  delivery_id?: InputMaybe<Scalars['Int']['input']>
  dispatch_id?: InputMaybe<Scalars['String']['input']>
  note?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type deliveries_list_lines_max_fields = {
  delivery_id?: Maybe<Scalars['Int']['output']>
  dispatch_id?: Maybe<Scalars['String']['output']>
  note?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_max_order_by = {
  delivery_id?: InputMaybe<order_by>
  dispatch_id?: InputMaybe<order_by>
  note?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type deliveries_list_lines_min_fields = {
  delivery_id?: Maybe<Scalars['Int']['output']>
  dispatch_id?: Maybe<Scalars['String']['output']>
  note?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_min_order_by = {
  delivery_id?: InputMaybe<order_by>
  dispatch_id?: InputMaybe<order_by>
  note?: InputMaybe<order_by>
}

/** response of any mutation on the table "deliveries_list_lines" */
export type deliveries_list_lines_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<deliveries_list_lines>
}

/** input type for inserting object relation for remote table "deliveries_list_lines" */
export type deliveries_list_lines_obj_rel_insert_input = {
  data: deliveries_list_lines_insert_input
  on_conflict?: InputMaybe<deliveries_list_lines_on_conflict>
}

/** on conflict condition type for table "deliveries_list_lines" */
export type deliveries_list_lines_on_conflict = {
  constraint: deliveries_list_lines_constraint
  update_columns: Array<deliveries_list_lines_update_column>
  where?: InputMaybe<deliveries_list_lines_bool_exp>
}

/** ordering options when selecting data from "deliveries_list_lines" */
export type deliveries_list_lines_order_by = {
  delivery_id?: InputMaybe<order_by>
  dispatch_id?: InputMaybe<order_by>
  note?: InputMaybe<order_by>
}

/** select columns of table "deliveries_list_lines" */
export type deliveries_list_lines_select_column =
  /** column name */
  | 'delivery_id'
  /** column name */
  | 'dispatch_id'
  /** column name */
  | 'note'

/** input type for updating data in table "deliveries_list_lines" */
export type deliveries_list_lines_set_input = {
  delivery_id?: InputMaybe<Scalars['Int']['input']>
  dispatch_id?: InputMaybe<Scalars['String']['input']>
  note?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type deliveries_list_lines_stddev_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_stddev_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type deliveries_list_lines_stddev_pop_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_stddev_pop_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type deliveries_list_lines_stddev_samp_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_stddev_samp_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type deliveries_list_lines_sum_fields = {
  delivery_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_sum_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** update columns of table "deliveries_list_lines" */
export type deliveries_list_lines_update_column =
  /** column name */
  | 'delivery_id'
  /** column name */
  | 'dispatch_id'
  /** column name */
  | 'note'

/** aggregate var_pop on columns */
export type deliveries_list_lines_var_pop_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_var_pop_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type deliveries_list_lines_var_samp_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_var_samp_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type deliveries_list_lines_variance_fields = {
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "deliveries_list_lines" */
export type deliveries_list_lines_variance_order_by = {
  delivery_id?: InputMaybe<order_by>
}

/** aggregate max on columns */
export type deliveries_max_fields = {
  delivered_routes?: Maybe<Scalars['String']['output']>
  delivery_date?: Maybe<Scalars['date']['output']>
  delivery_driver?: Maybe<Scalars['Int']['output']>
  delivery_id?: Maybe<Scalars['Int']['output']>
  delivery_vehicle?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "deliveries" */
export type deliveries_max_order_by = {
  delivered_routes?: InputMaybe<order_by>
  delivery_date?: InputMaybe<order_by>
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
  delivery_vehicle?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type deliveries_min_fields = {
  delivered_routes?: Maybe<Scalars['String']['output']>
  delivery_date?: Maybe<Scalars['date']['output']>
  delivery_driver?: Maybe<Scalars['Int']['output']>
  delivery_id?: Maybe<Scalars['Int']['output']>
  delivery_vehicle?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "deliveries" */
export type deliveries_min_order_by = {
  delivered_routes?: InputMaybe<order_by>
  delivery_date?: InputMaybe<order_by>
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
  delivery_vehicle?: InputMaybe<order_by>
}

/** response of any mutation on the table "deliveries" */
export type deliveries_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<deliveries>
}

/** input type for inserting object relation for remote table "deliveries" */
export type deliveries_obj_rel_insert_input = {
  data: deliveries_insert_input
  on_conflict?: InputMaybe<deliveries_on_conflict>
}

/** on conflict condition type for table "deliveries" */
export type deliveries_on_conflict = {
  constraint: deliveries_constraint
  update_columns: Array<deliveries_update_column>
  where?: InputMaybe<deliveries_bool_exp>
}

/** ordering options when selecting data from "deliveries" */
export type deliveries_order_by = {
  delivered_routes?: InputMaybe<order_by>
  delivery_date?: InputMaybe<order_by>
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
  delivery_vehicle?: InputMaybe<order_by>
  driver?: InputMaybe<drivers_order_by>
  isDeliveryListLocked?: InputMaybe<order_by>
  vehicle?: InputMaybe<vehicles_order_by>
}

/** select columns of table "deliveries" */
export type deliveries_select_column =
  /** column name */
  | 'delivered_routes'
  /** column name */
  | 'delivery_date'
  /** column name */
  | 'delivery_driver'
  /** column name */
  | 'delivery_id'
  /** column name */
  | 'delivery_vehicle'
  /** column name */
  | 'isDeliveryListLocked'

/** input type for updating data in table "deliveries" */
export type deliveries_set_input = {
  delivered_routes?: InputMaybe<Scalars['String']['input']>
  delivery_date?: InputMaybe<Scalars['date']['input']>
  delivery_driver?: InputMaybe<Scalars['Int']['input']>
  delivery_id?: InputMaybe<Scalars['Int']['input']>
  delivery_vehicle?: InputMaybe<Scalars['String']['input']>
  isDeliveryListLocked?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate stddev on columns */
export type deliveries_stddev_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "deliveries" */
export type deliveries_stddev_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type deliveries_stddev_pop_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "deliveries" */
export type deliveries_stddev_pop_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type deliveries_stddev_samp_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "deliveries" */
export type deliveries_stddev_samp_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type deliveries_sum_fields = {
  delivery_driver?: Maybe<Scalars['Int']['output']>
  delivery_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "deliveries" */
export type deliveries_sum_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** update columns of table "deliveries" */
export type deliveries_update_column =
  /** column name */
  | 'delivered_routes'
  /** column name */
  | 'delivery_date'
  /** column name */
  | 'delivery_driver'
  /** column name */
  | 'delivery_id'
  /** column name */
  | 'delivery_vehicle'
  /** column name */
  | 'isDeliveryListLocked'

/** aggregate var_pop on columns */
export type deliveries_var_pop_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "deliveries" */
export type deliveries_var_pop_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type deliveries_var_samp_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "deliveries" */
export type deliveries_var_samp_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type deliveries_variance_fields = {
  delivery_driver?: Maybe<Scalars['Float']['output']>
  delivery_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "deliveries" */
export type deliveries_variance_order_by = {
  delivery_driver?: InputMaybe<order_by>
  delivery_id?: InputMaybe<order_by>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headers = {
  /** An object relationship */
  _customer?: Maybe<customers>
  /** An object relationship */
  _dispatch_address?: Maybe<addresses>
  /** An array relationship */
  _goods_transactions: Array<goods_transactions>
  /** An aggregated array relationship */
  _goods_transactions_aggregate: goods_transactions_aggregate
  /** An array relationship */
  _related_orders: Array<goods_transactions>
  /** An aggregated array relationship */
  _related_orders_aggregate: goods_transactions_aggregate
  /** An object relationship */
  company: companies
  company_id: Scalars['String']['output']
  /** An object relationship */
  customer: customers
  customer_id: Scalars['String']['output']
  diapatch_delivery_veichle?: Maybe<Scalars['String']['output']>
  dispatch_address_id?: Maybe<Scalars['String']['output']>
  dispatch_canceled: Scalars['Boolean']['output']
  /** An object relationship */
  dispatch_customer_address?: Maybe<addresses>
  dispatch_date: Scalars['date']['output']
  dispatch_delivery_date?: Maybe<Scalars['date']['output']>
  dispatch_delivery_driver?: Maybe<Scalars['String']['output']>
  dispatch_exchange_rate?: Maybe<Scalars['numeric']['output']>
  dispatch_exchange_unit?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  dispatch_goodstransactions_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  dispatch_goodstransactions_rel_aggregate: goods_transactions_aggregate
  /** An object relationship */
  dispatch_headers_addresses_rel_dispatch_address?: Maybe<addresses>
  /** An object relationship */
  dispatch_headers_addresses_rel_invoice_address?: Maybe<addresses>
  /** An object relationship */
  dispatch_headers_customers_rel?: Maybe<customers>
  dispatch_invoiced: Scalars['Boolean']['output']
  dispatch_language: Scalars['String']['output']
  dispatch_lock: Scalars['Boolean']['output']
  dispatch_number: Scalars['String']['output']
  dispatch_type: Scalars['String']['output']
  invoice_address_id?: Maybe<Scalars['String']['output']>
  is_dispatch_added_delivery_list: Scalars['Boolean']['output']
  is_dispatch_delivered: Scalars['Boolean']['output']
  is_dispatch_returned: Scalars['Boolean']['output']
  /** An array relationship */
  related_orders: Array<goods_transactions>
  /** An aggregated array relationship */
  related_orders_aggregate: goods_transactions_aggregate
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headers_goods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headers_goods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headers_related_ordersArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headers_related_orders_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headersdispatch_goodstransactions_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headersdispatch_goodstransactions_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headersrelated_ordersArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "dispatch_headers" */
export type dispatch_headersrelated_orders_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** aggregated selection of "dispatch_headers" */
export type dispatch_headers_aggregate = {
  aggregate?: Maybe<dispatch_headers_aggregate_fields>
  nodes: Array<dispatch_headers>
}

/** aggregate fields of "dispatch_headers" */
export type dispatch_headers_aggregate_fields = {
  avg?: Maybe<dispatch_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<dispatch_headers_max_fields>
  min?: Maybe<dispatch_headers_min_fields>
  stddev?: Maybe<dispatch_headers_stddev_fields>
  stddev_pop?: Maybe<dispatch_headers_stddev_pop_fields>
  stddev_samp?: Maybe<dispatch_headers_stddev_samp_fields>
  sum?: Maybe<dispatch_headers_sum_fields>
  var_pop?: Maybe<dispatch_headers_var_pop_fields>
  var_samp?: Maybe<dispatch_headers_var_samp_fields>
  variance?: Maybe<dispatch_headers_variance_fields>
}

/** aggregate fields of "dispatch_headers" */
export type dispatch_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<dispatch_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "dispatch_headers" */
export type dispatch_headers_aggregate_order_by = {
  avg?: InputMaybe<dispatch_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<dispatch_headers_max_order_by>
  min?: InputMaybe<dispatch_headers_min_order_by>
  stddev?: InputMaybe<dispatch_headers_stddev_order_by>
  stddev_pop?: InputMaybe<dispatch_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<dispatch_headers_stddev_samp_order_by>
  sum?: InputMaybe<dispatch_headers_sum_order_by>
  var_pop?: InputMaybe<dispatch_headers_var_pop_order_by>
  var_samp?: InputMaybe<dispatch_headers_var_samp_order_by>
  variance?: InputMaybe<dispatch_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "dispatch_headers" */
export type dispatch_headers_arr_rel_insert_input = {
  data: Array<dispatch_headers_insert_input>
  on_conflict?: InputMaybe<dispatch_headers_on_conflict>
}

/** aggregate avg on columns */
export type dispatch_headers_avg_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "dispatch_headers" */
export type dispatch_headers_avg_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "dispatch_headers". All fields are combined with a logical 'AND'. */
export type dispatch_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<dispatch_headers_bool_exp>>>
  _customer?: InputMaybe<customers_bool_exp>
  _dispatch_address?: InputMaybe<addresses_bool_exp>
  _goods_transactions?: InputMaybe<goods_transactions_bool_exp>
  _not?: InputMaybe<dispatch_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<dispatch_headers_bool_exp>>>
  _related_orders?: InputMaybe<goods_transactions_bool_exp>
  company?: InputMaybe<companies_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  customer?: InputMaybe<customers_bool_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  diapatch_delivery_veichle?: InputMaybe<String_comparison_exp>
  dispatch_address_id?: InputMaybe<String_comparison_exp>
  dispatch_canceled?: InputMaybe<Boolean_comparison_exp>
  dispatch_customer_address?: InputMaybe<addresses_bool_exp>
  dispatch_date?: InputMaybe<date_comparison_exp>
  dispatch_delivery_date?: InputMaybe<date_comparison_exp>
  dispatch_delivery_driver?: InputMaybe<String_comparison_exp>
  dispatch_exchange_rate?: InputMaybe<numeric_comparison_exp>
  dispatch_exchange_unit?: InputMaybe<String_comparison_exp>
  dispatch_goodstransactions_rel?: InputMaybe<goods_transactions_bool_exp>
  dispatch_headers_addresses_rel_dispatch_address?: InputMaybe<addresses_bool_exp>
  dispatch_headers_addresses_rel_invoice_address?: InputMaybe<addresses_bool_exp>
  dispatch_headers_customers_rel?: InputMaybe<customers_bool_exp>
  dispatch_invoiced?: InputMaybe<Boolean_comparison_exp>
  dispatch_language?: InputMaybe<String_comparison_exp>
  dispatch_lock?: InputMaybe<Boolean_comparison_exp>
  dispatch_number?: InputMaybe<String_comparison_exp>
  dispatch_type?: InputMaybe<String_comparison_exp>
  invoice_address_id?: InputMaybe<String_comparison_exp>
  is_dispatch_added_delivery_list?: InputMaybe<Boolean_comparison_exp>
  is_dispatch_delivered?: InputMaybe<Boolean_comparison_exp>
  is_dispatch_returned?: InputMaybe<Boolean_comparison_exp>
  related_orders?: InputMaybe<goods_transactions_bool_exp>
}

/** unique or primary key constraints on table "dispatch_headers" */
export type dispatch_headers_constraint =
  /** unique or primary key constraint */
  'dispatch_headers_pkey'

/** input type for inserting data into table "dispatch_headers" */
export type dispatch_headers_insert_input = {
  _customer?: InputMaybe<customers_obj_rel_insert_input>
  _dispatch_address?: InputMaybe<addresses_obj_rel_insert_input>
  _goods_transactions?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _related_orders?: InputMaybe<goods_transactions_arr_rel_insert_input>
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  customer?: InputMaybe<customers_obj_rel_insert_input>
  customer_id?: InputMaybe<Scalars['String']['input']>
  diapatch_delivery_veichle?: InputMaybe<Scalars['String']['input']>
  dispatch_address_id?: InputMaybe<Scalars['String']['input']>
  dispatch_canceled?: InputMaybe<Scalars['Boolean']['input']>
  dispatch_customer_address?: InputMaybe<addresses_obj_rel_insert_input>
  dispatch_date?: InputMaybe<Scalars['date']['input']>
  dispatch_delivery_date?: InputMaybe<Scalars['date']['input']>
  dispatch_delivery_driver?: InputMaybe<Scalars['String']['input']>
  dispatch_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  dispatch_exchange_unit?: InputMaybe<Scalars['String']['input']>
  dispatch_goodstransactions_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  dispatch_headers_addresses_rel_dispatch_address?: InputMaybe<addresses_obj_rel_insert_input>
  dispatch_headers_addresses_rel_invoice_address?: InputMaybe<addresses_obj_rel_insert_input>
  dispatch_headers_customers_rel?: InputMaybe<customers_obj_rel_insert_input>
  dispatch_invoiced?: InputMaybe<Scalars['Boolean']['input']>
  dispatch_language?: InputMaybe<Scalars['String']['input']>
  dispatch_lock?: InputMaybe<Scalars['Boolean']['input']>
  dispatch_number?: InputMaybe<Scalars['String']['input']>
  dispatch_type?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  is_dispatch_added_delivery_list?: InputMaybe<Scalars['Boolean']['input']>
  is_dispatch_delivered?: InputMaybe<Scalars['Boolean']['input']>
  is_dispatch_returned?: InputMaybe<Scalars['Boolean']['input']>
  related_orders?: InputMaybe<goods_transactions_arr_rel_insert_input>
}

/** aggregate max on columns */
export type dispatch_headers_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  diapatch_delivery_veichle?: Maybe<Scalars['String']['output']>
  dispatch_address_id?: Maybe<Scalars['String']['output']>
  dispatch_date?: Maybe<Scalars['date']['output']>
  dispatch_delivery_date?: Maybe<Scalars['date']['output']>
  dispatch_delivery_driver?: Maybe<Scalars['String']['output']>
  dispatch_exchange_rate?: Maybe<Scalars['numeric']['output']>
  dispatch_exchange_unit?: Maybe<Scalars['String']['output']>
  dispatch_language?: Maybe<Scalars['String']['output']>
  dispatch_number?: Maybe<Scalars['String']['output']>
  dispatch_type?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "dispatch_headers" */
export type dispatch_headers_max_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  diapatch_delivery_veichle?: InputMaybe<order_by>
  dispatch_address_id?: InputMaybe<order_by>
  dispatch_date?: InputMaybe<order_by>
  dispatch_delivery_date?: InputMaybe<order_by>
  dispatch_delivery_driver?: InputMaybe<order_by>
  dispatch_exchange_rate?: InputMaybe<order_by>
  dispatch_exchange_unit?: InputMaybe<order_by>
  dispatch_language?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  dispatch_type?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type dispatch_headers_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  diapatch_delivery_veichle?: Maybe<Scalars['String']['output']>
  dispatch_address_id?: Maybe<Scalars['String']['output']>
  dispatch_date?: Maybe<Scalars['date']['output']>
  dispatch_delivery_date?: Maybe<Scalars['date']['output']>
  dispatch_delivery_driver?: Maybe<Scalars['String']['output']>
  dispatch_exchange_rate?: Maybe<Scalars['numeric']['output']>
  dispatch_exchange_unit?: Maybe<Scalars['String']['output']>
  dispatch_language?: Maybe<Scalars['String']['output']>
  dispatch_number?: Maybe<Scalars['String']['output']>
  dispatch_type?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "dispatch_headers" */
export type dispatch_headers_min_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  diapatch_delivery_veichle?: InputMaybe<order_by>
  dispatch_address_id?: InputMaybe<order_by>
  dispatch_date?: InputMaybe<order_by>
  dispatch_delivery_date?: InputMaybe<order_by>
  dispatch_delivery_driver?: InputMaybe<order_by>
  dispatch_exchange_rate?: InputMaybe<order_by>
  dispatch_exchange_unit?: InputMaybe<order_by>
  dispatch_language?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  dispatch_type?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "dispatch_headers" */
export type dispatch_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<dispatch_headers>
}

/** input type for inserting object relation for remote table "dispatch_headers" */
export type dispatch_headers_obj_rel_insert_input = {
  data: dispatch_headers_insert_input
  on_conflict?: InputMaybe<dispatch_headers_on_conflict>
}

/** on conflict condition type for table "dispatch_headers" */
export type dispatch_headers_on_conflict = {
  constraint: dispatch_headers_constraint
  update_columns: Array<dispatch_headers_update_column>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** ordering options when selecting data from "dispatch_headers" */
export type dispatch_headers_order_by = {
  _customer?: InputMaybe<customers_order_by>
  _dispatch_address?: InputMaybe<addresses_order_by>
  _goods_transactions_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _related_orders_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  company?: InputMaybe<companies_order_by>
  company_id?: InputMaybe<order_by>
  customer?: InputMaybe<customers_order_by>
  customer_id?: InputMaybe<order_by>
  diapatch_delivery_veichle?: InputMaybe<order_by>
  dispatch_address_id?: InputMaybe<order_by>
  dispatch_canceled?: InputMaybe<order_by>
  dispatch_customer_address?: InputMaybe<addresses_order_by>
  dispatch_date?: InputMaybe<order_by>
  dispatch_delivery_date?: InputMaybe<order_by>
  dispatch_delivery_driver?: InputMaybe<order_by>
  dispatch_exchange_rate?: InputMaybe<order_by>
  dispatch_exchange_unit?: InputMaybe<order_by>
  dispatch_goodstransactions_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  dispatch_headers_addresses_rel_dispatch_address?: InputMaybe<addresses_order_by>
  dispatch_headers_addresses_rel_invoice_address?: InputMaybe<addresses_order_by>
  dispatch_headers_customers_rel?: InputMaybe<customers_order_by>
  dispatch_invoiced?: InputMaybe<order_by>
  dispatch_language?: InputMaybe<order_by>
  dispatch_lock?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  dispatch_type?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  is_dispatch_added_delivery_list?: InputMaybe<order_by>
  is_dispatch_delivered?: InputMaybe<order_by>
  is_dispatch_returned?: InputMaybe<order_by>
  related_orders_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
}

/** select columns of table "dispatch_headers" */
export type dispatch_headers_select_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'diapatch_delivery_veichle'
  /** column name */
  | 'dispatch_address_id'
  /** column name */
  | 'dispatch_canceled'
  /** column name */
  | 'dispatch_date'
  /** column name */
  | 'dispatch_delivery_date'
  /** column name */
  | 'dispatch_delivery_driver'
  /** column name */
  | 'dispatch_exchange_rate'
  /** column name */
  | 'dispatch_exchange_unit'
  /** column name */
  | 'dispatch_invoiced'
  /** column name */
  | 'dispatch_language'
  /** column name */
  | 'dispatch_lock'
  /** column name */
  | 'dispatch_number'
  /** column name */
  | 'dispatch_type'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'is_dispatch_added_delivery_list'
  /** column name */
  | 'is_dispatch_delivered'
  /** column name */
  | 'is_dispatch_returned'

/** input type for updating data in table "dispatch_headers" */
export type dispatch_headers_set_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  diapatch_delivery_veichle?: InputMaybe<Scalars['String']['input']>
  dispatch_address_id?: InputMaybe<Scalars['String']['input']>
  dispatch_canceled?: InputMaybe<Scalars['Boolean']['input']>
  dispatch_date?: InputMaybe<Scalars['date']['input']>
  dispatch_delivery_date?: InputMaybe<Scalars['date']['input']>
  dispatch_delivery_driver?: InputMaybe<Scalars['String']['input']>
  dispatch_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  dispatch_exchange_unit?: InputMaybe<Scalars['String']['input']>
  dispatch_invoiced?: InputMaybe<Scalars['Boolean']['input']>
  dispatch_language?: InputMaybe<Scalars['String']['input']>
  dispatch_lock?: InputMaybe<Scalars['Boolean']['input']>
  dispatch_number?: InputMaybe<Scalars['String']['input']>
  dispatch_type?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  is_dispatch_added_delivery_list?: InputMaybe<Scalars['Boolean']['input']>
  is_dispatch_delivered?: InputMaybe<Scalars['Boolean']['input']>
  is_dispatch_returned?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate stddev on columns */
export type dispatch_headers_stddev_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "dispatch_headers" */
export type dispatch_headers_stddev_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type dispatch_headers_stddev_pop_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "dispatch_headers" */
export type dispatch_headers_stddev_pop_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type dispatch_headers_stddev_samp_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "dispatch_headers" */
export type dispatch_headers_stddev_samp_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type dispatch_headers_sum_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['numeric']['output']>
}

/** order by sum() on columns of table "dispatch_headers" */
export type dispatch_headers_sum_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** update columns of table "dispatch_headers" */
export type dispatch_headers_update_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'diapatch_delivery_veichle'
  /** column name */
  | 'dispatch_address_id'
  /** column name */
  | 'dispatch_canceled'
  /** column name */
  | 'dispatch_date'
  /** column name */
  | 'dispatch_delivery_date'
  /** column name */
  | 'dispatch_delivery_driver'
  /** column name */
  | 'dispatch_exchange_rate'
  /** column name */
  | 'dispatch_exchange_unit'
  /** column name */
  | 'dispatch_invoiced'
  /** column name */
  | 'dispatch_language'
  /** column name */
  | 'dispatch_lock'
  /** column name */
  | 'dispatch_number'
  /** column name */
  | 'dispatch_type'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'is_dispatch_added_delivery_list'
  /** column name */
  | 'is_dispatch_delivered'
  /** column name */
  | 'is_dispatch_returned'

/** aggregate var_pop on columns */
export type dispatch_headers_var_pop_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "dispatch_headers" */
export type dispatch_headers_var_pop_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type dispatch_headers_var_samp_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "dispatch_headers" */
export type dispatch_headers_var_samp_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type dispatch_headers_variance_fields = {
  dispatch_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "dispatch_headers" */
export type dispatch_headers_variance_order_by = {
  dispatch_exchange_rate?: InputMaybe<order_by>
}

/** columns and relationships of "document_transactions" */
export type document_transactions = {
  /** An array relationship */
  _addresses: Array<addresses>
  /** An aggregated array relationship */
  _addresses_aggregate: addresses_aggregate
  /** An object relationship */
  _customer?: Maybe<customers>
  /** An array relationship */
  _goods_transactions: Array<goods_transactions>
  /** An aggregated array relationship */
  _goods_transactions_aggregate: goods_transactions_aggregate
  /** An object relationship */
  _invoice_address?: Maybe<addresses>
  /** An array relationship */
  _invoice_lines: Array<goods_transactions>
  /** An aggregated array relationship */
  _invoice_lines_aggregate: goods_transactions_aggregate
  /** An array relationship */
  _purchase_invoice_totals: Array<goods_transactions>
  /** An aggregated array relationship */
  _purchase_invoice_totals_aggregate: goods_transactions_aggregate
  /** An array relationship */
  _related_dispatches: Array<goods_transactions>
  /** An aggregated array relationship */
  _related_dispatches_aggregate: goods_transactions_aggregate
  /** An array relationship */
  _related_orders: Array<goods_transactions>
  /** An aggregated array relationship */
  _related_orders_aggregate: goods_transactions_aggregate
  /** An object relationship */
  company: companies
  /** An object relationship */
  customer: customers
  customer_id: Scalars['String']['output']
  /** An array relationship */
  doc_tr_goods_tr_invoice_num_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  doc_tr_goods_tr_invoice_num_rel_aggregate: goods_transactions_aggregate
  /** An array relationship */
  document_transaction_goods_transactions_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  document_transaction_goods_transactions_rel_aggregate: goods_transactions_aggregate
  document_transaction_id: Scalars['String']['output']
  /** An array relationship */
  inv: Array<document_transactions>
  /** An aggregated array relationship */
  inv_aggregate: document_transactions_aggregate
  invoice_address_id?: Maybe<Scalars['String']['output']>
  invoice_canceled: Scalars['Boolean']['output']
  /** An object relationship */
  invoice_customer_address?: Maybe<addresses>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_exchange_rate: Scalars['numeric']['output']
  invoice_exchange_unit: Scalars['String']['output']
  invoice_grand_total: Scalars['Int']['output']
  invoice_language: Scalars['String']['output']
  invoice_lock: Scalars['Boolean']['output']
  invoice_number?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  invoice_payments: Array<payments>
  /** An aggregated array relationship */
  invoice_payments_aggregate: payments_aggregate
  invoice_rounding: Scalars['Int']['output']
  invoice_sent?: Maybe<Scalars['Boolean']['output']>
  invoice_total_credit: Scalars['Int']['output']
  /** An array relationship */
  invoice_totals: Array<goods_transactions>
  /** An aggregated array relationship */
  invoice_totals_aggregate: goods_transactions_aggregate
  invoice_type: Scalars['String']['output']
  invoice_vat_total_credit: Scalars['Int']['output']
  is_added_to_invoice_journal: Scalars['Boolean']['output']
  is_book_kept?: Maybe<Scalars['Boolean']['output']>
  is_doubtful_receivable?: Maybe<Scalars['Boolean']['output']>
  is_fee_addable: Scalars['Boolean']['output']
  is_invoice_paid?: Maybe<Scalars['String']['output']>
  is_invoice_reminded?: Maybe<Scalars['Boolean']['output']>
  is_sent_in_the_bailiffs: Scalars['Boolean']['output']
  is_sent_to_kronofogden?: Maybe<Scalars['Boolean']['output']>
  our_company: Scalars['String']['output']
  paper_invoice_fee: Scalars['Int']['output']
  paper_invoice_fee_vat: Scalars['Int']['output']
  paper_invoice_fee_vat_percent: Scalars['Int']['output']
  /** An array relationship */
  related_dispatches: Array<goods_transactions>
  /** An aggregated array relationship */
  related_dispatches_aggregate: goods_transactions_aggregate
  /** An array relationship */
  related_orders: Array<goods_transactions>
  /** An aggregated array relationship */
  related_orders_aggregate: goods_transactions_aggregate
  /** An object relationship */
  reminder_lines?: Maybe<reminder_lines>
  supplier_invoice_number?: Maybe<Scalars['String']['output']>
  transaction_date?: Maybe<Scalars['date']['output']>
  /** An array relationship */
  transaction_reminder_lines_rel: Array<reminder_lines>
  /** An aggregated array relationship */
  transaction_reminder_lines_rel_aggregate: reminder_lines_aggregate
  transaction_type?: Maybe<Scalars['String']['output']>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_addressesArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_addresses_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_goods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_goods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_invoice_linesArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_invoice_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_purchase_invoice_totalsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_purchase_invoice_totals_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_related_dispatchesArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_related_dispatches_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_related_ordersArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactions_related_orders_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsdoc_tr_goods_tr_invoice_num_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsdoc_tr_goods_tr_invoice_num_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<goods_transactions_order_by>>
    where?: InputMaybe<goods_transactions_bool_exp>
  }

/** columns and relationships of "document_transactions" */
export type document_transactionsdocument_transaction_goods_transactions_relArgs =
  {
    distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<goods_transactions_order_by>>
    where?: InputMaybe<goods_transactions_bool_exp>
  }

/** columns and relationships of "document_transactions" */
export type document_transactionsdocument_transaction_goods_transactions_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<goods_transactions_order_by>>
    where?: InputMaybe<goods_transactions_bool_exp>
  }

/** columns and relationships of "document_transactions" */
export type document_transactionsinvArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsinv_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsinvoice_paymentsArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsinvoice_payments_aggregateArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsinvoice_totalsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsinvoice_totals_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsrelated_dispatchesArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsrelated_dispatches_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsrelated_ordersArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionsrelated_orders_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionstransaction_reminder_lines_relArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "document_transactions" */
export type document_transactionstransaction_reminder_lines_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_lines_order_by>>
    where?: InputMaybe<reminder_lines_bool_exp>
  }

/** aggregated selection of "document_transactions" */
export type document_transactions_aggregate = {
  aggregate?: Maybe<document_transactions_aggregate_fields>
  nodes: Array<document_transactions>
}

/** aggregate fields of "document_transactions" */
export type document_transactions_aggregate_fields = {
  avg?: Maybe<document_transactions_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<document_transactions_max_fields>
  min?: Maybe<document_transactions_min_fields>
  stddev?: Maybe<document_transactions_stddev_fields>
  stddev_pop?: Maybe<document_transactions_stddev_pop_fields>
  stddev_samp?: Maybe<document_transactions_stddev_samp_fields>
  sum?: Maybe<document_transactions_sum_fields>
  var_pop?: Maybe<document_transactions_var_pop_fields>
  var_samp?: Maybe<document_transactions_var_samp_fields>
  variance?: Maybe<document_transactions_variance_fields>
}

/** aggregate fields of "document_transactions" */
export type document_transactions_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<document_transactions_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "document_transactions" */
export type document_transactions_aggregate_order_by = {
  avg?: InputMaybe<document_transactions_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<document_transactions_max_order_by>
  min?: InputMaybe<document_transactions_min_order_by>
  stddev?: InputMaybe<document_transactions_stddev_order_by>
  stddev_pop?: InputMaybe<document_transactions_stddev_pop_order_by>
  stddev_samp?: InputMaybe<document_transactions_stddev_samp_order_by>
  sum?: InputMaybe<document_transactions_sum_order_by>
  var_pop?: InputMaybe<document_transactions_var_pop_order_by>
  var_samp?: InputMaybe<document_transactions_var_samp_order_by>
  variance?: InputMaybe<document_transactions_variance_order_by>
}

/** input type for inserting array relation for remote table "document_transactions" */
export type document_transactions_arr_rel_insert_input = {
  data: Array<document_transactions_insert_input>
  on_conflict?: InputMaybe<document_transactions_on_conflict>
}

/** aggregate avg on columns */
export type document_transactions_avg_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "document_transactions" */
export type document_transactions_avg_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "document_transactions". All fields are combined with a logical 'AND'. */
export type document_transactions_bool_exp = {
  _addresses?: InputMaybe<addresses_bool_exp>
  _and?: InputMaybe<Array<InputMaybe<document_transactions_bool_exp>>>
  _customer?: InputMaybe<customers_bool_exp>
  _goods_transactions?: InputMaybe<goods_transactions_bool_exp>
  _invoice_address?: InputMaybe<addresses_bool_exp>
  _invoice_lines?: InputMaybe<goods_transactions_bool_exp>
  _not?: InputMaybe<document_transactions_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<document_transactions_bool_exp>>>
  _purchase_invoice_totals?: InputMaybe<goods_transactions_bool_exp>
  _related_dispatches?: InputMaybe<goods_transactions_bool_exp>
  _related_orders?: InputMaybe<goods_transactions_bool_exp>
  company?: InputMaybe<companies_bool_exp>
  customer?: InputMaybe<customers_bool_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  doc_tr_goods_tr_invoice_num_rel?: InputMaybe<goods_transactions_bool_exp>
  document_transaction_goods_transactions_rel?: InputMaybe<goods_transactions_bool_exp>
  document_transaction_id?: InputMaybe<String_comparison_exp>
  inv?: InputMaybe<document_transactions_bool_exp>
  invoice_address_id?: InputMaybe<String_comparison_exp>
  invoice_canceled?: InputMaybe<Boolean_comparison_exp>
  invoice_customer_address?: InputMaybe<addresses_bool_exp>
  invoice_date?: InputMaybe<date_comparison_exp>
  invoice_due_date?: InputMaybe<date_comparison_exp>
  invoice_exchange_rate?: InputMaybe<numeric_comparison_exp>
  invoice_exchange_unit?: InputMaybe<String_comparison_exp>
  invoice_grand_total?: InputMaybe<Int_comparison_exp>
  invoice_language?: InputMaybe<String_comparison_exp>
  invoice_lock?: InputMaybe<Boolean_comparison_exp>
  invoice_number?: InputMaybe<String_comparison_exp>
  invoice_payments?: InputMaybe<payments_bool_exp>
  invoice_rounding?: InputMaybe<Int_comparison_exp>
  invoice_sent?: InputMaybe<Boolean_comparison_exp>
  invoice_total_credit?: InputMaybe<Int_comparison_exp>
  invoice_totals?: InputMaybe<goods_transactions_bool_exp>
  invoice_type?: InputMaybe<String_comparison_exp>
  invoice_vat_total_credit?: InputMaybe<Int_comparison_exp>
  is_added_to_invoice_journal?: InputMaybe<Boolean_comparison_exp>
  is_book_kept?: InputMaybe<Boolean_comparison_exp>
  is_doubtful_receivable?: InputMaybe<Boolean_comparison_exp>
  is_fee_addable?: InputMaybe<Boolean_comparison_exp>
  is_invoice_paid?: InputMaybe<String_comparison_exp>
  is_invoice_reminded?: InputMaybe<Boolean_comparison_exp>
  is_sent_in_the_bailiffs?: InputMaybe<Boolean_comparison_exp>
  is_sent_to_kronofogden?: InputMaybe<Boolean_comparison_exp>
  our_company?: InputMaybe<String_comparison_exp>
  paper_invoice_fee?: InputMaybe<Int_comparison_exp>
  paper_invoice_fee_vat?: InputMaybe<Int_comparison_exp>
  paper_invoice_fee_vat_percent?: InputMaybe<Int_comparison_exp>
  related_dispatches?: InputMaybe<goods_transactions_bool_exp>
  related_orders?: InputMaybe<goods_transactions_bool_exp>
  reminder_lines?: InputMaybe<reminder_lines_bool_exp>
  supplier_invoice_number?: InputMaybe<String_comparison_exp>
  transaction_date?: InputMaybe<date_comparison_exp>
  transaction_reminder_lines_rel?: InputMaybe<reminder_lines_bool_exp>
  transaction_type?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "document_transactions" */
export type document_transactions_constraint =
  /** unique or primary key constraint */
  | 'document_transactions_money_transaction_id_key'
  /** unique or primary key constraint */
  | 'money_transactions_pkey'

/** input type for incrementing integer columne in table "document_transactions" */
export type document_transactions_inc_input = {
  invoice_grand_total?: InputMaybe<Scalars['Int']['input']>
  invoice_rounding?: InputMaybe<Scalars['Int']['input']>
  invoice_total_credit?: InputMaybe<Scalars['Int']['input']>
  invoice_vat_total_credit?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee_vat?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee_vat_percent?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "document_transactions" */
export type document_transactions_insert_input = {
  _addresses?: InputMaybe<addresses_arr_rel_insert_input>
  _customer?: InputMaybe<customers_obj_rel_insert_input>
  _goods_transactions?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _invoice_address?: InputMaybe<addresses_obj_rel_insert_input>
  _invoice_lines?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _purchase_invoice_totals?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _related_dispatches?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _related_orders?: InputMaybe<goods_transactions_arr_rel_insert_input>
  company?: InputMaybe<companies_obj_rel_insert_input>
  customer?: InputMaybe<customers_obj_rel_insert_input>
  customer_id?: InputMaybe<Scalars['String']['input']>
  doc_tr_goods_tr_invoice_num_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  document_transaction_goods_transactions_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  document_transaction_id?: InputMaybe<Scalars['String']['input']>
  inv?: InputMaybe<document_transactions_arr_rel_insert_input>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  invoice_canceled?: InputMaybe<Scalars['Boolean']['input']>
  invoice_customer_address?: InputMaybe<addresses_obj_rel_insert_input>
  invoice_date?: InputMaybe<Scalars['date']['input']>
  invoice_due_date?: InputMaybe<Scalars['date']['input']>
  invoice_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  invoice_exchange_unit?: InputMaybe<Scalars['String']['input']>
  invoice_grand_total?: InputMaybe<Scalars['Int']['input']>
  invoice_language?: InputMaybe<Scalars['String']['input']>
  invoice_lock?: InputMaybe<Scalars['Boolean']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  invoice_payments?: InputMaybe<payments_arr_rel_insert_input>
  invoice_rounding?: InputMaybe<Scalars['Int']['input']>
  invoice_sent?: InputMaybe<Scalars['Boolean']['input']>
  invoice_total_credit?: InputMaybe<Scalars['Int']['input']>
  invoice_totals?: InputMaybe<goods_transactions_arr_rel_insert_input>
  invoice_type?: InputMaybe<Scalars['String']['input']>
  invoice_vat_total_credit?: InputMaybe<Scalars['Int']['input']>
  is_added_to_invoice_journal?: InputMaybe<Scalars['Boolean']['input']>
  is_book_kept?: InputMaybe<Scalars['Boolean']['input']>
  is_doubtful_receivable?: InputMaybe<Scalars['Boolean']['input']>
  is_fee_addable?: InputMaybe<Scalars['Boolean']['input']>
  is_invoice_paid?: InputMaybe<Scalars['String']['input']>
  is_invoice_reminded?: InputMaybe<Scalars['Boolean']['input']>
  is_sent_in_the_bailiffs?: InputMaybe<Scalars['Boolean']['input']>
  is_sent_to_kronofogden?: InputMaybe<Scalars['Boolean']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  paper_invoice_fee?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee_vat?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee_vat_percent?: InputMaybe<Scalars['Int']['input']>
  related_dispatches?: InputMaybe<goods_transactions_arr_rel_insert_input>
  related_orders?: InputMaybe<goods_transactions_arr_rel_insert_input>
  reminder_lines?: InputMaybe<reminder_lines_obj_rel_insert_input>
  supplier_invoice_number?: InputMaybe<Scalars['String']['input']>
  transaction_date?: InputMaybe<Scalars['date']['input']>
  transaction_reminder_lines_rel?: InputMaybe<reminder_lines_arr_rel_insert_input>
  transaction_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type document_transactions_max_fields = {
  customer_id?: Maybe<Scalars['String']['output']>
  document_transaction_id?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_exchange_rate?: Maybe<Scalars['numeric']['output']>
  invoice_exchange_unit?: Maybe<Scalars['String']['output']>
  invoice_grand_total?: Maybe<Scalars['Int']['output']>
  invoice_language?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_rounding?: Maybe<Scalars['Int']['output']>
  invoice_total_credit?: Maybe<Scalars['Int']['output']>
  invoice_type?: Maybe<Scalars['String']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Int']['output']>
  is_invoice_paid?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  paper_invoice_fee?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Int']['output']>
  supplier_invoice_number?: Maybe<Scalars['String']['output']>
  transaction_date?: Maybe<Scalars['date']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "document_transactions" */
export type document_transactions_max_order_by = {
  customer_id?: InputMaybe<order_by>
  document_transaction_id?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_exchange_unit?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_language?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_type?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  is_invoice_paid?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
  supplier_invoice_number?: InputMaybe<order_by>
  transaction_date?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type document_transactions_min_fields = {
  customer_id?: Maybe<Scalars['String']['output']>
  document_transaction_id?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_exchange_rate?: Maybe<Scalars['numeric']['output']>
  invoice_exchange_unit?: Maybe<Scalars['String']['output']>
  invoice_grand_total?: Maybe<Scalars['Int']['output']>
  invoice_language?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_rounding?: Maybe<Scalars['Int']['output']>
  invoice_total_credit?: Maybe<Scalars['Int']['output']>
  invoice_type?: Maybe<Scalars['String']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Int']['output']>
  is_invoice_paid?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  paper_invoice_fee?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Int']['output']>
  supplier_invoice_number?: Maybe<Scalars['String']['output']>
  transaction_date?: Maybe<Scalars['date']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "document_transactions" */
export type document_transactions_min_order_by = {
  customer_id?: InputMaybe<order_by>
  document_transaction_id?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_exchange_unit?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_language?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_type?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  is_invoice_paid?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
  supplier_invoice_number?: InputMaybe<order_by>
  transaction_date?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
}

/** response of any mutation on the table "document_transactions" */
export type document_transactions_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<document_transactions>
}

/** input type for inserting object relation for remote table "document_transactions" */
export type document_transactions_obj_rel_insert_input = {
  data: document_transactions_insert_input
  on_conflict?: InputMaybe<document_transactions_on_conflict>
}

/** on conflict condition type for table "document_transactions" */
export type document_transactions_on_conflict = {
  constraint: document_transactions_constraint
  update_columns: Array<document_transactions_update_column>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** ordering options when selecting data from "document_transactions" */
export type document_transactions_order_by = {
  _addresses_aggregate?: InputMaybe<addresses_aggregate_order_by>
  _customer?: InputMaybe<customers_order_by>
  _goods_transactions_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _invoice_address?: InputMaybe<addresses_order_by>
  _invoice_lines_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _purchase_invoice_totals_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _related_dispatches_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _related_orders_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  company?: InputMaybe<companies_order_by>
  customer?: InputMaybe<customers_order_by>
  customer_id?: InputMaybe<order_by>
  doc_tr_goods_tr_invoice_num_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  document_transaction_goods_transactions_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  document_transaction_id?: InputMaybe<order_by>
  inv_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  invoice_address_id?: InputMaybe<order_by>
  invoice_canceled?: InputMaybe<order_by>
  invoice_customer_address?: InputMaybe<addresses_order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_exchange_unit?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_language?: InputMaybe<order_by>
  invoice_lock?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_payments_aggregate?: InputMaybe<payments_aggregate_order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_sent?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_totals_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  invoice_type?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  is_added_to_invoice_journal?: InputMaybe<order_by>
  is_book_kept?: InputMaybe<order_by>
  is_doubtful_receivable?: InputMaybe<order_by>
  is_fee_addable?: InputMaybe<order_by>
  is_invoice_paid?: InputMaybe<order_by>
  is_invoice_reminded?: InputMaybe<order_by>
  is_sent_in_the_bailiffs?: InputMaybe<order_by>
  is_sent_to_kronofogden?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
  related_dispatches_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  related_orders_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  reminder_lines?: InputMaybe<reminder_lines_order_by>
  supplier_invoice_number?: InputMaybe<order_by>
  transaction_date?: InputMaybe<order_by>
  transaction_reminder_lines_rel_aggregate?: InputMaybe<reminder_lines_aggregate_order_by>
  transaction_type?: InputMaybe<order_by>
}

/** select columns of table "document_transactions" */
export type document_transactions_select_column =
  /** column name */
  | 'customer_id'
  /** column name */
  | 'document_transaction_id'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'invoice_canceled'
  /** column name */
  | 'invoice_date'
  /** column name */
  | 'invoice_due_date'
  /** column name */
  | 'invoice_exchange_rate'
  /** column name */
  | 'invoice_exchange_unit'
  /** column name */
  | 'invoice_grand_total'
  /** column name */
  | 'invoice_language'
  /** column name */
  | 'invoice_lock'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'invoice_rounding'
  /** column name */
  | 'invoice_sent'
  /** column name */
  | 'invoice_total_credit'
  /** column name */
  | 'invoice_type'
  /** column name */
  | 'invoice_vat_total_credit'
  /** column name */
  | 'is_added_to_invoice_journal'
  /** column name */
  | 'is_book_kept'
  /** column name */
  | 'is_doubtful_receivable'
  /** column name */
  | 'is_fee_addable'
  /** column name */
  | 'is_invoice_paid'
  /** column name */
  | 'is_invoice_reminded'
  /** column name */
  | 'is_sent_in_the_bailiffs'
  /** column name */
  | 'is_sent_to_kronofogden'
  /** column name */
  | 'our_company'
  /** column name */
  | 'paper_invoice_fee'
  /** column name */
  | 'paper_invoice_fee_vat'
  /** column name */
  | 'paper_invoice_fee_vat_percent'
  /** column name */
  | 'supplier_invoice_number'
  /** column name */
  | 'transaction_date'
  /** column name */
  | 'transaction_type'

/** input type for updating data in table "document_transactions" */
export type document_transactions_set_input = {
  customer_id?: InputMaybe<Scalars['String']['input']>
  document_transaction_id?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  invoice_canceled?: InputMaybe<Scalars['Boolean']['input']>
  invoice_date?: InputMaybe<Scalars['date']['input']>
  invoice_due_date?: InputMaybe<Scalars['date']['input']>
  invoice_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  invoice_exchange_unit?: InputMaybe<Scalars['String']['input']>
  invoice_grand_total?: InputMaybe<Scalars['Int']['input']>
  invoice_language?: InputMaybe<Scalars['String']['input']>
  invoice_lock?: InputMaybe<Scalars['Boolean']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  invoice_rounding?: InputMaybe<Scalars['Int']['input']>
  invoice_sent?: InputMaybe<Scalars['Boolean']['input']>
  invoice_total_credit?: InputMaybe<Scalars['Int']['input']>
  invoice_type?: InputMaybe<Scalars['String']['input']>
  invoice_vat_total_credit?: InputMaybe<Scalars['Int']['input']>
  is_added_to_invoice_journal?: InputMaybe<Scalars['Boolean']['input']>
  is_book_kept?: InputMaybe<Scalars['Boolean']['input']>
  is_doubtful_receivable?: InputMaybe<Scalars['Boolean']['input']>
  is_fee_addable?: InputMaybe<Scalars['Boolean']['input']>
  is_invoice_paid?: InputMaybe<Scalars['String']['input']>
  is_invoice_reminded?: InputMaybe<Scalars['Boolean']['input']>
  is_sent_in_the_bailiffs?: InputMaybe<Scalars['Boolean']['input']>
  is_sent_to_kronofogden?: InputMaybe<Scalars['Boolean']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  paper_invoice_fee?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee_vat?: InputMaybe<Scalars['Int']['input']>
  paper_invoice_fee_vat_percent?: InputMaybe<Scalars['Int']['input']>
  supplier_invoice_number?: InputMaybe<Scalars['String']['input']>
  transaction_date?: InputMaybe<Scalars['date']['input']>
  transaction_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type document_transactions_stddev_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "document_transactions" */
export type document_transactions_stddev_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type document_transactions_stddev_pop_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "document_transactions" */
export type document_transactions_stddev_pop_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type document_transactions_stddev_samp_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "document_transactions" */
export type document_transactions_stddev_samp_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type document_transactions_sum_fields = {
  invoice_exchange_rate?: Maybe<Scalars['numeric']['output']>
  invoice_grand_total?: Maybe<Scalars['Int']['output']>
  invoice_rounding?: Maybe<Scalars['Int']['output']>
  invoice_total_credit?: Maybe<Scalars['Int']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Int']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "document_transactions" */
export type document_transactions_sum_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** update columns of table "document_transactions" */
export type document_transactions_update_column =
  /** column name */
  | 'customer_id'
  /** column name */
  | 'document_transaction_id'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'invoice_canceled'
  /** column name */
  | 'invoice_date'
  /** column name */
  | 'invoice_due_date'
  /** column name */
  | 'invoice_exchange_rate'
  /** column name */
  | 'invoice_exchange_unit'
  /** column name */
  | 'invoice_grand_total'
  /** column name */
  | 'invoice_language'
  /** column name */
  | 'invoice_lock'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'invoice_rounding'
  /** column name */
  | 'invoice_sent'
  /** column name */
  | 'invoice_total_credit'
  /** column name */
  | 'invoice_type'
  /** column name */
  | 'invoice_vat_total_credit'
  /** column name */
  | 'is_added_to_invoice_journal'
  /** column name */
  | 'is_book_kept'
  /** column name */
  | 'is_doubtful_receivable'
  /** column name */
  | 'is_fee_addable'
  /** column name */
  | 'is_invoice_paid'
  /** column name */
  | 'is_invoice_reminded'
  /** column name */
  | 'is_sent_in_the_bailiffs'
  /** column name */
  | 'is_sent_to_kronofogden'
  /** column name */
  | 'our_company'
  /** column name */
  | 'paper_invoice_fee'
  /** column name */
  | 'paper_invoice_fee_vat'
  /** column name */
  | 'paper_invoice_fee_vat_percent'
  /** column name */
  | 'supplier_invoice_number'
  /** column name */
  | 'transaction_date'
  /** column name */
  | 'transaction_type'

/** aggregate var_pop on columns */
export type document_transactions_var_pop_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "document_transactions" */
export type document_transactions_var_pop_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type document_transactions_var_samp_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "document_transactions" */
export type document_transactions_var_samp_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type document_transactions_variance_fields = {
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  invoice_grand_total?: Maybe<Scalars['Float']['output']>
  invoice_rounding?: Maybe<Scalars['Float']['output']>
  invoice_total_credit?: Maybe<Scalars['Float']['output']>
  invoice_vat_total_credit?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat?: Maybe<Scalars['Float']['output']>
  paper_invoice_fee_vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "document_transactions" */
export type document_transactions_variance_order_by = {
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_grand_total?: InputMaybe<order_by>
  invoice_rounding?: InputMaybe<order_by>
  invoice_total_credit?: InputMaybe<order_by>
  invoice_vat_total_credit?: InputMaybe<order_by>
  paper_invoice_fee?: InputMaybe<order_by>
  paper_invoice_fee_vat?: InputMaybe<order_by>
  paper_invoice_fee_vat_percent?: InputMaybe<order_by>
}

/** columns and relationships of "drivers" */
export type drivers = {
  /** An array relationship */
  deliveries: Array<deliveries>
  /** An aggregated array relationship */
  deliveries_aggregate: deliveries_aggregate
  driver_id: Scalars['Int']['output']
  driver_name: Scalars['String']['output']
  driver_person_nummer: Scalars['String']['output']
  is_active: Scalars['Boolean']['output']
}

/** columns and relationships of "drivers" */
export type driversdeliveriesArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** columns and relationships of "drivers" */
export type driversdeliveries_aggregateArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** aggregated selection of "drivers" */
export type drivers_aggregate = {
  aggregate?: Maybe<drivers_aggregate_fields>
  nodes: Array<drivers>
}

/** aggregate fields of "drivers" */
export type drivers_aggregate_fields = {
  avg?: Maybe<drivers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<drivers_max_fields>
  min?: Maybe<drivers_min_fields>
  stddev?: Maybe<drivers_stddev_fields>
  stddev_pop?: Maybe<drivers_stddev_pop_fields>
  stddev_samp?: Maybe<drivers_stddev_samp_fields>
  sum?: Maybe<drivers_sum_fields>
  var_pop?: Maybe<drivers_var_pop_fields>
  var_samp?: Maybe<drivers_var_samp_fields>
  variance?: Maybe<drivers_variance_fields>
}

/** aggregate fields of "drivers" */
export type drivers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<drivers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "drivers" */
export type drivers_aggregate_order_by = {
  avg?: InputMaybe<drivers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<drivers_max_order_by>
  min?: InputMaybe<drivers_min_order_by>
  stddev?: InputMaybe<drivers_stddev_order_by>
  stddev_pop?: InputMaybe<drivers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<drivers_stddev_samp_order_by>
  sum?: InputMaybe<drivers_sum_order_by>
  var_pop?: InputMaybe<drivers_var_pop_order_by>
  var_samp?: InputMaybe<drivers_var_samp_order_by>
  variance?: InputMaybe<drivers_variance_order_by>
}

/** input type for inserting array relation for remote table "drivers" */
export type drivers_arr_rel_insert_input = {
  data: Array<drivers_insert_input>
  on_conflict?: InputMaybe<drivers_on_conflict>
}

/** aggregate avg on columns */
export type drivers_avg_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "drivers" */
export type drivers_avg_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "drivers". All fields are combined with a logical 'AND'. */
export type drivers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<drivers_bool_exp>>>
  _not?: InputMaybe<drivers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<drivers_bool_exp>>>
  deliveries?: InputMaybe<deliveries_bool_exp>
  driver_id?: InputMaybe<Int_comparison_exp>
  driver_name?: InputMaybe<String_comparison_exp>
  driver_person_nummer?: InputMaybe<String_comparison_exp>
  is_active?: InputMaybe<Boolean_comparison_exp>
}

/** unique or primary key constraints on table "drivers" */
export type drivers_constraint =
  /** unique or primary key constraint */
  'drivers_pkey'

/** input type for incrementing integer columne in table "drivers" */
export type drivers_inc_input = {
  driver_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "drivers" */
export type drivers_insert_input = {
  deliveries?: InputMaybe<deliveries_arr_rel_insert_input>
  driver_id?: InputMaybe<Scalars['Int']['input']>
  driver_name?: InputMaybe<Scalars['String']['input']>
  driver_person_nummer?: InputMaybe<Scalars['String']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate max on columns */
export type drivers_max_fields = {
  driver_id?: Maybe<Scalars['Int']['output']>
  driver_name?: Maybe<Scalars['String']['output']>
  driver_person_nummer?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "drivers" */
export type drivers_max_order_by = {
  driver_id?: InputMaybe<order_by>
  driver_name?: InputMaybe<order_by>
  driver_person_nummer?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type drivers_min_fields = {
  driver_id?: Maybe<Scalars['Int']['output']>
  driver_name?: Maybe<Scalars['String']['output']>
  driver_person_nummer?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "drivers" */
export type drivers_min_order_by = {
  driver_id?: InputMaybe<order_by>
  driver_name?: InputMaybe<order_by>
  driver_person_nummer?: InputMaybe<order_by>
}

/** response of any mutation on the table "drivers" */
export type drivers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<drivers>
}

/** input type for inserting object relation for remote table "drivers" */
export type drivers_obj_rel_insert_input = {
  data: drivers_insert_input
  on_conflict?: InputMaybe<drivers_on_conflict>
}

/** on conflict condition type for table "drivers" */
export type drivers_on_conflict = {
  constraint: drivers_constraint
  update_columns: Array<drivers_update_column>
  where?: InputMaybe<drivers_bool_exp>
}

/** ordering options when selecting data from "drivers" */
export type drivers_order_by = {
  deliveries_aggregate?: InputMaybe<deliveries_aggregate_order_by>
  driver_id?: InputMaybe<order_by>
  driver_name?: InputMaybe<order_by>
  driver_person_nummer?: InputMaybe<order_by>
  is_active?: InputMaybe<order_by>
}

/** select columns of table "drivers" */
export type drivers_select_column =
  /** column name */
  | 'driver_id'
  /** column name */
  | 'driver_name'
  /** column name */
  | 'driver_person_nummer'
  /** column name */
  | 'is_active'

/** input type for updating data in table "drivers" */
export type drivers_set_input = {
  driver_id?: InputMaybe<Scalars['Int']['input']>
  driver_name?: InputMaybe<Scalars['String']['input']>
  driver_person_nummer?: InputMaybe<Scalars['String']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
}

/** aggregate stddev on columns */
export type drivers_stddev_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "drivers" */
export type drivers_stddev_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type drivers_stddev_pop_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "drivers" */
export type drivers_stddev_pop_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type drivers_stddev_samp_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "drivers" */
export type drivers_stddev_samp_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type drivers_sum_fields = {
  driver_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "drivers" */
export type drivers_sum_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** update columns of table "drivers" */
export type drivers_update_column =
  /** column name */
  | 'driver_id'
  /** column name */
  | 'driver_name'
  /** column name */
  | 'driver_person_nummer'
  /** column name */
  | 'is_active'

/** aggregate var_pop on columns */
export type drivers_var_pop_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "drivers" */
export type drivers_var_pop_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type drivers_var_samp_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "drivers" */
export type drivers_var_samp_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type drivers_variance_fields = {
  driver_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "drivers" */
export type drivers_variance_order_by = {
  driver_id?: InputMaybe<order_by>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactions = {
  /** An object relationship */
  _dispatch_headers?: Maybe<dispatch_headers>
  /** An object relationship */
  _document_transactions?: Maybe<document_transactions>
  /** An array relationship */
  _invoices: Array<document_transactions>
  /** An aggregated array relationship */
  _invoices_aggregate: document_transactions_aggregate
  /** An object relationship */
  _order_headers?: Maybe<order_headers>
  /** An array relationship */
  _reminder_lines: Array<reminder_lines>
  /** An aggregated array relationship */
  _reminder_lines_aggregate: reminder_lines_aggregate
  amount_credit?: Maybe<Scalars['Int']['output']>
  amount_debit?: Maybe<Scalars['Int']['output']>
  dispatch_amount?: Maybe<Scalars['Int']['output']>
  dispatch_number?: Maybe<Scalars['String']['output']>
  /** An array relationship */
  goods_transaction_goods_transaction_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  goods_transaction_goods_transaction_rel_aggregate: goods_transactions_aggregate
  goods_transaction_id: Scalars['uuid']['output']
  /** An object relationship */
  goods_transactions_dispatch_haeaders_rel?: Maybe<dispatch_headers>
  /** An object relationship */
  goods_transactions_document_transactions_rel?: Maybe<document_transactions>
  /** An array relationship */
  goods_transactions_goods_transactions_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  goods_transactions_goods_transactions_rel_aggregate: goods_transactions_aggregate
  /** An array relationship */
  goods_transactions_reminder_lines_rel: Array<reminder_lines>
  /** An aggregated array relationship */
  goods_transactions_reminder_lines_rel_aggregate: reminder_lines_aggregate
  /** An array relationship */
  goods_transactions_stock_id_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  goods_transactions_stock_id_rel_aggregate: goods_transactions_aggregate
  /** An object relationship */
  goods_transactions_stock_rel?: Maybe<stock>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_price?: Maybe<Scalars['Int']['output']>
  invoice_price_exchange?: Maybe<Scalars['Int']['output']>
  line_info?: Maybe<Scalars['String']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  line_price_total_debit?: Maybe<Scalars['Int']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Int']['output']>
  order_amount?: Maybe<Scalars['Int']['output']>
  /** An object relationship */
  order_haeders?: Maybe<order_headers>
  order_number?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
  unit_price?: Maybe<Scalars['Int']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
  vat_debit?: Maybe<Scalars['Int']['output']>
  vat_debit_exchange?: Maybe<Scalars['Int']['output']>
  vat_percent?: Maybe<Scalars['Int']['output']>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactions_invoicesArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactions_invoices_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactions_reminder_linesArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactions_reminder_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transaction_goods_transaction_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transaction_goods_transaction_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<goods_transactions_order_by>>
    where?: InputMaybe<goods_transactions_bool_exp>
  }

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transactions_goods_transactions_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transactions_goods_transactions_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<goods_transactions_order_by>>
    where?: InputMaybe<goods_transactions_bool_exp>
  }

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transactions_reminder_lines_relArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transactions_reminder_lines_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_lines_order_by>>
    where?: InputMaybe<reminder_lines_bool_exp>
  }

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transactions_stock_id_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "goods_transactions" */
export type goods_transactionsgoods_transactions_stock_id_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** aggregated selection of "goods_transactions" */
export type goods_transactions_aggregate = {
  aggregate?: Maybe<goods_transactions_aggregate_fields>
  nodes: Array<goods_transactions>
}

/** aggregate fields of "goods_transactions" */
export type goods_transactions_aggregate_fields = {
  avg?: Maybe<goods_transactions_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<goods_transactions_max_fields>
  min?: Maybe<goods_transactions_min_fields>
  stddev?: Maybe<goods_transactions_stddev_fields>
  stddev_pop?: Maybe<goods_transactions_stddev_pop_fields>
  stddev_samp?: Maybe<goods_transactions_stddev_samp_fields>
  sum?: Maybe<goods_transactions_sum_fields>
  var_pop?: Maybe<goods_transactions_var_pop_fields>
  var_samp?: Maybe<goods_transactions_var_samp_fields>
  variance?: Maybe<goods_transactions_variance_fields>
}

/** aggregate fields of "goods_transactions" */
export type goods_transactions_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<goods_transactions_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "goods_transactions" */
export type goods_transactions_aggregate_order_by = {
  avg?: InputMaybe<goods_transactions_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<goods_transactions_max_order_by>
  min?: InputMaybe<goods_transactions_min_order_by>
  stddev?: InputMaybe<goods_transactions_stddev_order_by>
  stddev_pop?: InputMaybe<goods_transactions_stddev_pop_order_by>
  stddev_samp?: InputMaybe<goods_transactions_stddev_samp_order_by>
  sum?: InputMaybe<goods_transactions_sum_order_by>
  var_pop?: InputMaybe<goods_transactions_var_pop_order_by>
  var_samp?: InputMaybe<goods_transactions_var_samp_order_by>
  variance?: InputMaybe<goods_transactions_variance_order_by>
}

/** input type for inserting array relation for remote table "goods_transactions" */
export type goods_transactions_arr_rel_insert_input = {
  data: Array<goods_transactions_insert_input>
  on_conflict?: InputMaybe<goods_transactions_on_conflict>
}

/** aggregate avg on columns */
export type goods_transactions_avg_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "goods_transactions" */
export type goods_transactions_avg_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "goods_transactions". All fields are combined with a logical 'AND'. */
export type goods_transactions_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<goods_transactions_bool_exp>>>
  _dispatch_headers?: InputMaybe<dispatch_headers_bool_exp>
  _document_transactions?: InputMaybe<document_transactions_bool_exp>
  _invoices?: InputMaybe<document_transactions_bool_exp>
  _not?: InputMaybe<goods_transactions_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<goods_transactions_bool_exp>>>
  _order_headers?: InputMaybe<order_headers_bool_exp>
  _reminder_lines?: InputMaybe<reminder_lines_bool_exp>
  amount_credit?: InputMaybe<Int_comparison_exp>
  amount_debit?: InputMaybe<Int_comparison_exp>
  dispatch_amount?: InputMaybe<Int_comparison_exp>
  dispatch_number?: InputMaybe<String_comparison_exp>
  goods_transaction_goods_transaction_rel?: InputMaybe<goods_transactions_bool_exp>
  goods_transaction_id?: InputMaybe<uuid_comparison_exp>
  goods_transactions_dispatch_haeaders_rel?: InputMaybe<dispatch_headers_bool_exp>
  goods_transactions_document_transactions_rel?: InputMaybe<document_transactions_bool_exp>
  goods_transactions_goods_transactions_rel?: InputMaybe<goods_transactions_bool_exp>
  goods_transactions_reminder_lines_rel?: InputMaybe<reminder_lines_bool_exp>
  goods_transactions_stock_id_rel?: InputMaybe<goods_transactions_bool_exp>
  goods_transactions_stock_rel?: InputMaybe<stock_bool_exp>
  invoice_number?: InputMaybe<String_comparison_exp>
  invoice_price?: InputMaybe<Int_comparison_exp>
  invoice_price_exchange?: InputMaybe<Int_comparison_exp>
  line_info?: InputMaybe<String_comparison_exp>
  line_price_total_credit?: InputMaybe<Int_comparison_exp>
  line_price_total_credit_exchange?: InputMaybe<Int_comparison_exp>
  line_price_total_debit?: InputMaybe<Int_comparison_exp>
  line_price_total_debit_exchange?: InputMaybe<Int_comparison_exp>
  order_amount?: InputMaybe<Int_comparison_exp>
  order_haeders?: InputMaybe<order_headers_bool_exp>
  order_number?: InputMaybe<String_comparison_exp>
  stock_id?: InputMaybe<String_comparison_exp>
  transaction_type?: InputMaybe<String_comparison_exp>
  unit_price?: InputMaybe<Int_comparison_exp>
  vat_credit?: InputMaybe<Int_comparison_exp>
  vat_credit_exchange?: InputMaybe<Int_comparison_exp>
  vat_debit?: InputMaybe<Int_comparison_exp>
  vat_debit_exchange?: InputMaybe<Int_comparison_exp>
  vat_percent?: InputMaybe<Int_comparison_exp>
}

/** unique or primary key constraints on table "goods_transactions" */
export type goods_transactions_constraint =
  /** unique or primary key constraint */
  'goods_transactions_pkey'

/** input type for incrementing integer columne in table "goods_transactions" */
export type goods_transactions_inc_input = {
  amount_credit?: InputMaybe<Scalars['Int']['input']>
  amount_debit?: InputMaybe<Scalars['Int']['input']>
  dispatch_amount?: InputMaybe<Scalars['Int']['input']>
  invoice_price?: InputMaybe<Scalars['Int']['input']>
  invoice_price_exchange?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  line_price_total_debit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_debit_exchange?: InputMaybe<Scalars['Int']['input']>
  order_amount?: InputMaybe<Scalars['Int']['input']>
  unit_price?: InputMaybe<Scalars['Int']['input']>
  vat_credit?: InputMaybe<Scalars['Int']['input']>
  vat_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  vat_debit?: InputMaybe<Scalars['Int']['input']>
  vat_debit_exchange?: InputMaybe<Scalars['Int']['input']>
  vat_percent?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "goods_transactions" */
export type goods_transactions_insert_input = {
  _dispatch_headers?: InputMaybe<dispatch_headers_obj_rel_insert_input>
  _document_transactions?: InputMaybe<document_transactions_obj_rel_insert_input>
  _invoices?: InputMaybe<document_transactions_arr_rel_insert_input>
  _order_headers?: InputMaybe<order_headers_obj_rel_insert_input>
  _reminder_lines?: InputMaybe<reminder_lines_arr_rel_insert_input>
  amount_credit?: InputMaybe<Scalars['Int']['input']>
  amount_debit?: InputMaybe<Scalars['Int']['input']>
  dispatch_amount?: InputMaybe<Scalars['Int']['input']>
  dispatch_number?: InputMaybe<Scalars['String']['input']>
  goods_transaction_goods_transaction_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  goods_transaction_id?: InputMaybe<Scalars['uuid']['input']>
  goods_transactions_dispatch_haeaders_rel?: InputMaybe<dispatch_headers_obj_rel_insert_input>
  goods_transactions_document_transactions_rel?: InputMaybe<document_transactions_obj_rel_insert_input>
  goods_transactions_goods_transactions_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  goods_transactions_reminder_lines_rel?: InputMaybe<reminder_lines_arr_rel_insert_input>
  goods_transactions_stock_id_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  goods_transactions_stock_rel?: InputMaybe<stock_obj_rel_insert_input>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  invoice_price?: InputMaybe<Scalars['Int']['input']>
  invoice_price_exchange?: InputMaybe<Scalars['Int']['input']>
  line_info?: InputMaybe<Scalars['String']['input']>
  line_price_total_credit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  line_price_total_debit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_debit_exchange?: InputMaybe<Scalars['Int']['input']>
  order_amount?: InputMaybe<Scalars['Int']['input']>
  order_haeders?: InputMaybe<order_headers_obj_rel_insert_input>
  order_number?: InputMaybe<Scalars['String']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
  transaction_type?: InputMaybe<Scalars['String']['input']>
  unit_price?: InputMaybe<Scalars['Int']['input']>
  vat_credit?: InputMaybe<Scalars['Int']['input']>
  vat_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  vat_debit?: InputMaybe<Scalars['Int']['input']>
  vat_debit_exchange?: InputMaybe<Scalars['Int']['input']>
  vat_percent?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate max on columns */
export type goods_transactions_max_fields = {
  amount_credit?: Maybe<Scalars['Int']['output']>
  amount_debit?: Maybe<Scalars['Int']['output']>
  dispatch_amount?: Maybe<Scalars['Int']['output']>
  dispatch_number?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_price?: Maybe<Scalars['Int']['output']>
  invoice_price_exchange?: Maybe<Scalars['Int']['output']>
  line_info?: Maybe<Scalars['String']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  line_price_total_debit?: Maybe<Scalars['Int']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Int']['output']>
  order_amount?: Maybe<Scalars['Int']['output']>
  order_number?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
  unit_price?: Maybe<Scalars['Int']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
  vat_debit?: Maybe<Scalars['Int']['output']>
  vat_debit_exchange?: Maybe<Scalars['Int']['output']>
  vat_percent?: Maybe<Scalars['Int']['output']>
}

/** order by max() on columns of table "goods_transactions" */
export type goods_transactions_max_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_info?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type goods_transactions_min_fields = {
  amount_credit?: Maybe<Scalars['Int']['output']>
  amount_debit?: Maybe<Scalars['Int']['output']>
  dispatch_amount?: Maybe<Scalars['Int']['output']>
  dispatch_number?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_price?: Maybe<Scalars['Int']['output']>
  invoice_price_exchange?: Maybe<Scalars['Int']['output']>
  line_info?: Maybe<Scalars['String']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  line_price_total_debit?: Maybe<Scalars['Int']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Int']['output']>
  order_amount?: Maybe<Scalars['Int']['output']>
  order_number?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
  transaction_type?: Maybe<Scalars['String']['output']>
  unit_price?: Maybe<Scalars['Int']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
  vat_debit?: Maybe<Scalars['Int']['output']>
  vat_debit_exchange?: Maybe<Scalars['Int']['output']>
  vat_percent?: Maybe<Scalars['Int']['output']>
}

/** order by min() on columns of table "goods_transactions" */
export type goods_transactions_min_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_info?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** response of any mutation on the table "goods_transactions" */
export type goods_transactions_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<goods_transactions>
}

/** input type for inserting object relation for remote table "goods_transactions" */
export type goods_transactions_obj_rel_insert_input = {
  data: goods_transactions_insert_input
  on_conflict?: InputMaybe<goods_transactions_on_conflict>
}

/** on conflict condition type for table "goods_transactions" */
export type goods_transactions_on_conflict = {
  constraint: goods_transactions_constraint
  update_columns: Array<goods_transactions_update_column>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** ordering options when selecting data from "goods_transactions" */
export type goods_transactions_order_by = {
  _dispatch_headers?: InputMaybe<dispatch_headers_order_by>
  _document_transactions?: InputMaybe<document_transactions_order_by>
  _invoices_aggregate?: InputMaybe<document_transactions_aggregate_order_by>
  _order_headers?: InputMaybe<order_headers_order_by>
  _reminder_lines_aggregate?: InputMaybe<reminder_lines_aggregate_order_by>
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  dispatch_number?: InputMaybe<order_by>
  goods_transaction_goods_transaction_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  goods_transaction_id?: InputMaybe<order_by>
  goods_transactions_dispatch_haeaders_rel?: InputMaybe<dispatch_headers_order_by>
  goods_transactions_document_transactions_rel?: InputMaybe<document_transactions_order_by>
  goods_transactions_goods_transactions_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  goods_transactions_reminder_lines_rel_aggregate?: InputMaybe<reminder_lines_aggregate_order_by>
  goods_transactions_stock_id_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  goods_transactions_stock_rel?: InputMaybe<stock_order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_info?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  order_haeders?: InputMaybe<order_headers_order_by>
  order_number?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
  transaction_type?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** select columns of table "goods_transactions" */
export type goods_transactions_select_column =
  /** column name */
  | 'amount_credit'
  /** column name */
  | 'amount_debit'
  /** column name */
  | 'dispatch_amount'
  /** column name */
  | 'dispatch_number'
  /** column name */
  | 'goods_transaction_id'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'invoice_price'
  /** column name */
  | 'invoice_price_exchange'
  /** column name */
  | 'line_info'
  /** column name */
  | 'line_price_total_credit'
  /** column name */
  | 'line_price_total_credit_exchange'
  /** column name */
  | 'line_price_total_debit'
  /** column name */
  | 'line_price_total_debit_exchange'
  /** column name */
  | 'order_amount'
  /** column name */
  | 'order_number'
  /** column name */
  | 'stock_id'
  /** column name */
  | 'transaction_type'
  /** column name */
  | 'unit_price'
  /** column name */
  | 'vat_credit'
  /** column name */
  | 'vat_credit_exchange'
  /** column name */
  | 'vat_debit'
  /** column name */
  | 'vat_debit_exchange'
  /** column name */
  | 'vat_percent'

/** input type for updating data in table "goods_transactions" */
export type goods_transactions_set_input = {
  amount_credit?: InputMaybe<Scalars['Int']['input']>
  amount_debit?: InputMaybe<Scalars['Int']['input']>
  dispatch_amount?: InputMaybe<Scalars['Int']['input']>
  dispatch_number?: InputMaybe<Scalars['String']['input']>
  goods_transaction_id?: InputMaybe<Scalars['uuid']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  invoice_price?: InputMaybe<Scalars['Int']['input']>
  invoice_price_exchange?: InputMaybe<Scalars['Int']['input']>
  line_info?: InputMaybe<Scalars['String']['input']>
  line_price_total_credit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  line_price_total_debit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_debit_exchange?: InputMaybe<Scalars['Int']['input']>
  order_amount?: InputMaybe<Scalars['Int']['input']>
  order_number?: InputMaybe<Scalars['String']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
  transaction_type?: InputMaybe<Scalars['String']['input']>
  unit_price?: InputMaybe<Scalars['Int']['input']>
  vat_credit?: InputMaybe<Scalars['Int']['input']>
  vat_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  vat_debit?: InputMaybe<Scalars['Int']['input']>
  vat_debit_exchange?: InputMaybe<Scalars['Int']['input']>
  vat_percent?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type goods_transactions_stddev_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "goods_transactions" */
export type goods_transactions_stddev_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type goods_transactions_stddev_pop_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "goods_transactions" */
export type goods_transactions_stddev_pop_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type goods_transactions_stddev_samp_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "goods_transactions" */
export type goods_transactions_stddev_samp_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type goods_transactions_sum_fields = {
  amount_credit?: Maybe<Scalars['Int']['output']>
  amount_debit?: Maybe<Scalars['Int']['output']>
  dispatch_amount?: Maybe<Scalars['Int']['output']>
  invoice_price?: Maybe<Scalars['Int']['output']>
  invoice_price_exchange?: Maybe<Scalars['Int']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  line_price_total_debit?: Maybe<Scalars['Int']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Int']['output']>
  order_amount?: Maybe<Scalars['Int']['output']>
  unit_price?: Maybe<Scalars['Int']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
  vat_debit?: Maybe<Scalars['Int']['output']>
  vat_debit_exchange?: Maybe<Scalars['Int']['output']>
  vat_percent?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "goods_transactions" */
export type goods_transactions_sum_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** update columns of table "goods_transactions" */
export type goods_transactions_update_column =
  /** column name */
  | 'amount_credit'
  /** column name */
  | 'amount_debit'
  /** column name */
  | 'dispatch_amount'
  /** column name */
  | 'dispatch_number'
  /** column name */
  | 'goods_transaction_id'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'invoice_price'
  /** column name */
  | 'invoice_price_exchange'
  /** column name */
  | 'line_info'
  /** column name */
  | 'line_price_total_credit'
  /** column name */
  | 'line_price_total_credit_exchange'
  /** column name */
  | 'line_price_total_debit'
  /** column name */
  | 'line_price_total_debit_exchange'
  /** column name */
  | 'order_amount'
  /** column name */
  | 'order_number'
  /** column name */
  | 'stock_id'
  /** column name */
  | 'transaction_type'
  /** column name */
  | 'unit_price'
  /** column name */
  | 'vat_credit'
  /** column name */
  | 'vat_credit_exchange'
  /** column name */
  | 'vat_debit'
  /** column name */
  | 'vat_debit_exchange'
  /** column name */
  | 'vat_percent'

/** aggregate var_pop on columns */
export type goods_transactions_var_pop_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "goods_transactions" */
export type goods_transactions_var_pop_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type goods_transactions_var_samp_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "goods_transactions" */
export type goods_transactions_var_samp_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type goods_transactions_variance_fields = {
  amount_credit?: Maybe<Scalars['Float']['output']>
  amount_debit?: Maybe<Scalars['Float']['output']>
  dispatch_amount?: Maybe<Scalars['Float']['output']>
  invoice_price?: Maybe<Scalars['Float']['output']>
  invoice_price_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  line_price_total_debit?: Maybe<Scalars['Float']['output']>
  line_price_total_debit_exchange?: Maybe<Scalars['Float']['output']>
  order_amount?: Maybe<Scalars['Float']['output']>
  unit_price?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
  vat_debit?: Maybe<Scalars['Float']['output']>
  vat_debit_exchange?: Maybe<Scalars['Float']['output']>
  vat_percent?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "goods_transactions" */
export type goods_transactions_variance_order_by = {
  amount_credit?: InputMaybe<order_by>
  amount_debit?: InputMaybe<order_by>
  dispatch_amount?: InputMaybe<order_by>
  invoice_price?: InputMaybe<order_by>
  invoice_price_exchange?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  line_price_total_debit?: InputMaybe<order_by>
  line_price_total_debit_exchange?: InputMaybe<order_by>
  order_amount?: InputMaybe<order_by>
  unit_price?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
  vat_debit?: InputMaybe<order_by>
  vat_debit_exchange?: InputMaybe<order_by>
  vat_percent?: InputMaybe<order_by>
}

/** columns and relationships of "invoice_book_keep_headers" */
export type invoice_book_keep_headers = {
  book_keep_date: Scalars['date']['output']
  book_keep_id: Scalars['Int']['output']
  customer_or_supplier_id: Scalars['String']['output']
  customer_or_supplier_title: Scalars['String']['output']
  /** An array relationship */
  invoice_book_keep_lines_rel: Array<invoice_book_keep_lines>
  /** An aggregated array relationship */
  invoice_book_keep_lines_rel_aggregate: invoice_book_keep_lines_aggregate
  invoice_date: Scalars['date']['output']
  invoice_due_date: Scalars['date']['output']
  invoice_exchange_rate: Scalars['numeric']['output']
  invoice_exchange_unit: Scalars['String']['output']
  /** An object relationship */
  invoice_journal_headers_rel?: Maybe<invoice_journal_headers>
  invoice_number: Scalars['String']['output']
  line_price_total_credit: Scalars['Int']['output']
  line_price_total_credit_exchange: Scalars['Int']['output']
  our_company: Scalars['String']['output']
  report_number: Scalars['Int']['output']
  report_type: Scalars['String']['output']
  vat_credit: Scalars['Int']['output']
  vat_credit_exchange: Scalars['Int']['output']
}

/** columns and relationships of "invoice_book_keep_headers" */
export type invoice_book_keep_headersinvoice_book_keep_lines_relArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** columns and relationships of "invoice_book_keep_headers" */
export type invoice_book_keep_headersinvoice_book_keep_lines_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
    where?: InputMaybe<invoice_book_keep_lines_bool_exp>
  }

/** aggregated selection of "invoice_book_keep_headers" */
export type invoice_book_keep_headers_aggregate = {
  aggregate?: Maybe<invoice_book_keep_headers_aggregate_fields>
  nodes: Array<invoice_book_keep_headers>
}

/** aggregate fields of "invoice_book_keep_headers" */
export type invoice_book_keep_headers_aggregate_fields = {
  avg?: Maybe<invoice_book_keep_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<invoice_book_keep_headers_max_fields>
  min?: Maybe<invoice_book_keep_headers_min_fields>
  stddev?: Maybe<invoice_book_keep_headers_stddev_fields>
  stddev_pop?: Maybe<invoice_book_keep_headers_stddev_pop_fields>
  stddev_samp?: Maybe<invoice_book_keep_headers_stddev_samp_fields>
  sum?: Maybe<invoice_book_keep_headers_sum_fields>
  var_pop?: Maybe<invoice_book_keep_headers_var_pop_fields>
  var_samp?: Maybe<invoice_book_keep_headers_var_samp_fields>
  variance?: Maybe<invoice_book_keep_headers_variance_fields>
}

/** aggregate fields of "invoice_book_keep_headers" */
export type invoice_book_keep_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_aggregate_order_by = {
  avg?: InputMaybe<invoice_book_keep_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<invoice_book_keep_headers_max_order_by>
  min?: InputMaybe<invoice_book_keep_headers_min_order_by>
  stddev?: InputMaybe<invoice_book_keep_headers_stddev_order_by>
  stddev_pop?: InputMaybe<invoice_book_keep_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<invoice_book_keep_headers_stddev_samp_order_by>
  sum?: InputMaybe<invoice_book_keep_headers_sum_order_by>
  var_pop?: InputMaybe<invoice_book_keep_headers_var_pop_order_by>
  var_samp?: InputMaybe<invoice_book_keep_headers_var_samp_order_by>
  variance?: InputMaybe<invoice_book_keep_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_arr_rel_insert_input = {
  data: Array<invoice_book_keep_headers_insert_input>
  on_conflict?: InputMaybe<invoice_book_keep_headers_on_conflict>
}

/** aggregate avg on columns */
export type invoice_book_keep_headers_avg_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_avg_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "invoice_book_keep_headers". All fields are combined with a logical 'AND'. */
export type invoice_book_keep_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<invoice_book_keep_headers_bool_exp>>>
  _not?: InputMaybe<invoice_book_keep_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<invoice_book_keep_headers_bool_exp>>>
  book_keep_date?: InputMaybe<date_comparison_exp>
  book_keep_id?: InputMaybe<Int_comparison_exp>
  customer_or_supplier_id?: InputMaybe<String_comparison_exp>
  customer_or_supplier_title?: InputMaybe<String_comparison_exp>
  invoice_book_keep_lines_rel?: InputMaybe<invoice_book_keep_lines_bool_exp>
  invoice_date?: InputMaybe<date_comparison_exp>
  invoice_due_date?: InputMaybe<date_comparison_exp>
  invoice_exchange_rate?: InputMaybe<numeric_comparison_exp>
  invoice_exchange_unit?: InputMaybe<String_comparison_exp>
  invoice_journal_headers_rel?: InputMaybe<invoice_journal_headers_bool_exp>
  invoice_number?: InputMaybe<String_comparison_exp>
  line_price_total_credit?: InputMaybe<Int_comparison_exp>
  line_price_total_credit_exchange?: InputMaybe<Int_comparison_exp>
  our_company?: InputMaybe<String_comparison_exp>
  report_number?: InputMaybe<Int_comparison_exp>
  report_type?: InputMaybe<String_comparison_exp>
  vat_credit?: InputMaybe<Int_comparison_exp>
  vat_credit_exchange?: InputMaybe<Int_comparison_exp>
}

/** unique or primary key constraints on table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_constraint =
  /** unique or primary key constraint */
  'invoice_book_keep_headers_pkey'

/** input type for incrementing integer columne in table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_inc_input = {
  book_keep_id?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  vat_credit?: InputMaybe<Scalars['Int']['input']>
  vat_credit_exchange?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_insert_input = {
  book_keep_date?: InputMaybe<Scalars['date']['input']>
  book_keep_id?: InputMaybe<Scalars['Int']['input']>
  customer_or_supplier_id?: InputMaybe<Scalars['String']['input']>
  customer_or_supplier_title?: InputMaybe<Scalars['String']['input']>
  invoice_book_keep_lines_rel?: InputMaybe<invoice_book_keep_lines_arr_rel_insert_input>
  invoice_date?: InputMaybe<Scalars['date']['input']>
  invoice_due_date?: InputMaybe<Scalars['date']['input']>
  invoice_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  invoice_exchange_unit?: InputMaybe<Scalars['String']['input']>
  invoice_journal_headers_rel?: InputMaybe<invoice_journal_headers_obj_rel_insert_input>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  line_price_total_credit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
  vat_credit?: InputMaybe<Scalars['Int']['input']>
  vat_credit_exchange?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate max on columns */
export type invoice_book_keep_headers_max_fields = {
  book_keep_date?: Maybe<Scalars['date']['output']>
  book_keep_id?: Maybe<Scalars['Int']['output']>
  customer_or_supplier_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_title?: Maybe<Scalars['String']['output']>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_exchange_rate?: Maybe<Scalars['numeric']['output']>
  invoice_exchange_unit?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
}

/** order by max() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_max_order_by = {
  book_keep_date?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  customer_or_supplier_id?: InputMaybe<order_by>
  customer_or_supplier_title?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_exchange_unit?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type invoice_book_keep_headers_min_fields = {
  book_keep_date?: Maybe<Scalars['date']['output']>
  book_keep_id?: Maybe<Scalars['Int']['output']>
  customer_or_supplier_id?: Maybe<Scalars['String']['output']>
  customer_or_supplier_title?: Maybe<Scalars['String']['output']>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_exchange_rate?: Maybe<Scalars['numeric']['output']>
  invoice_exchange_unit?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
}

/** order by min() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_min_order_by = {
  book_keep_date?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  customer_or_supplier_id?: InputMaybe<order_by>
  customer_or_supplier_title?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_exchange_unit?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** response of any mutation on the table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<invoice_book_keep_headers>
}

/** input type for inserting object relation for remote table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_obj_rel_insert_input = {
  data: invoice_book_keep_headers_insert_input
  on_conflict?: InputMaybe<invoice_book_keep_headers_on_conflict>
}

/** on conflict condition type for table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_on_conflict = {
  constraint: invoice_book_keep_headers_constraint
  update_columns: Array<invoice_book_keep_headers_update_column>
  where?: InputMaybe<invoice_book_keep_headers_bool_exp>
}

/** ordering options when selecting data from "invoice_book_keep_headers" */
export type invoice_book_keep_headers_order_by = {
  book_keep_date?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  customer_or_supplier_id?: InputMaybe<order_by>
  customer_or_supplier_title?: InputMaybe<order_by>
  invoice_book_keep_lines_rel_aggregate?: InputMaybe<invoice_book_keep_lines_aggregate_order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  invoice_exchange_unit?: InputMaybe<order_by>
  invoice_journal_headers_rel?: InputMaybe<invoice_journal_headers_order_by>
  invoice_number?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** select columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_select_column =
  /** column name */
  | 'book_keep_date'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'customer_or_supplier_id'
  /** column name */
  | 'customer_or_supplier_title'
  /** column name */
  | 'invoice_date'
  /** column name */
  | 'invoice_due_date'
  /** column name */
  | 'invoice_exchange_rate'
  /** column name */
  | 'invoice_exchange_unit'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'line_price_total_credit'
  /** column name */
  | 'line_price_total_credit_exchange'
  /** column name */
  | 'our_company'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'
  /** column name */
  | 'vat_credit'
  /** column name */
  | 'vat_credit_exchange'

/** input type for updating data in table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_set_input = {
  book_keep_date?: InputMaybe<Scalars['date']['input']>
  book_keep_id?: InputMaybe<Scalars['Int']['input']>
  customer_or_supplier_id?: InputMaybe<Scalars['String']['input']>
  customer_or_supplier_title?: InputMaybe<Scalars['String']['input']>
  invoice_date?: InputMaybe<Scalars['date']['input']>
  invoice_due_date?: InputMaybe<Scalars['date']['input']>
  invoice_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  invoice_exchange_unit?: InputMaybe<Scalars['String']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  line_price_total_credit?: InputMaybe<Scalars['Int']['input']>
  line_price_total_credit_exchange?: InputMaybe<Scalars['Int']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
  vat_credit?: InputMaybe<Scalars['Int']['input']>
  vat_credit_exchange?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type invoice_book_keep_headers_stddev_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_stddev_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type invoice_book_keep_headers_stddev_pop_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_stddev_pop_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type invoice_book_keep_headers_stddev_samp_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_stddev_samp_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type invoice_book_keep_headers_sum_fields = {
  book_keep_id?: Maybe<Scalars['Int']['output']>
  invoice_exchange_rate?: Maybe<Scalars['numeric']['output']>
  line_price_total_credit?: Maybe<Scalars['Int']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Int']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  vat_credit?: Maybe<Scalars['Int']['output']>
  vat_credit_exchange?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_sum_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** update columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_update_column =
  /** column name */
  | 'book_keep_date'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'customer_or_supplier_id'
  /** column name */
  | 'customer_or_supplier_title'
  /** column name */
  | 'invoice_date'
  /** column name */
  | 'invoice_due_date'
  /** column name */
  | 'invoice_exchange_rate'
  /** column name */
  | 'invoice_exchange_unit'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'line_price_total_credit'
  /** column name */
  | 'line_price_total_credit_exchange'
  /** column name */
  | 'our_company'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'
  /** column name */
  | 'vat_credit'
  /** column name */
  | 'vat_credit_exchange'

/** aggregate var_pop on columns */
export type invoice_book_keep_headers_var_pop_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_var_pop_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type invoice_book_keep_headers_var_samp_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_var_samp_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type invoice_book_keep_headers_variance_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  invoice_exchange_rate?: Maybe<Scalars['Float']['output']>
  line_price_total_credit?: Maybe<Scalars['Float']['output']>
  line_price_total_credit_exchange?: Maybe<Scalars['Float']['output']>
  report_number?: Maybe<Scalars['Float']['output']>
  vat_credit?: Maybe<Scalars['Float']['output']>
  vat_credit_exchange?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "invoice_book_keep_headers" */
export type invoice_book_keep_headers_variance_order_by = {
  book_keep_id?: InputMaybe<order_by>
  invoice_exchange_rate?: InputMaybe<order_by>
  line_price_total_credit?: InputMaybe<order_by>
  line_price_total_credit_exchange?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  vat_credit?: InputMaybe<order_by>
  vat_credit_exchange?: InputMaybe<order_by>
}

/** columns and relationships of "invoice_book_keep_lines" */
export type invoice_book_keep_lines = {
  account_id: Scalars['String']['output']
  account_name: Scalars['String']['output']
  book_keep_id: Scalars['Int']['output']
  credit: Scalars['Int']['output']
  debit: Scalars['Int']['output']
  /** An object relationship */
  invoice_book_keep_header_rel: invoice_book_keep_headers
  /** An array relationship */
  invoice_book_keep_lines_self_rel: Array<invoice_book_keep_lines>
  /** An aggregated array relationship */
  invoice_book_keep_lines_self_rel_aggregate: invoice_book_keep_lines_aggregate
  /** An array relationship */
  invoice_book_keep_lines_self_relation: Array<invoice_book_keep_lines>
  /** An aggregated array relationship */
  invoice_book_keep_lines_self_relation_aggregate: invoice_book_keep_lines_aggregate
  line_id: Scalars['Int']['output']
}

/** columns and relationships of "invoice_book_keep_lines" */
export type invoice_book_keep_linesinvoice_book_keep_lines_self_relArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** columns and relationships of "invoice_book_keep_lines" */
export type invoice_book_keep_linesinvoice_book_keep_lines_self_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
    where?: InputMaybe<invoice_book_keep_lines_bool_exp>
  }

/** columns and relationships of "invoice_book_keep_lines" */
export type invoice_book_keep_linesinvoice_book_keep_lines_self_relationArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** columns and relationships of "invoice_book_keep_lines" */
export type invoice_book_keep_linesinvoice_book_keep_lines_self_relation_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
    where?: InputMaybe<invoice_book_keep_lines_bool_exp>
  }

/** aggregated selection of "invoice_book_keep_lines" */
export type invoice_book_keep_lines_aggregate = {
  aggregate?: Maybe<invoice_book_keep_lines_aggregate_fields>
  nodes: Array<invoice_book_keep_lines>
}

/** aggregate fields of "invoice_book_keep_lines" */
export type invoice_book_keep_lines_aggregate_fields = {
  avg?: Maybe<invoice_book_keep_lines_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<invoice_book_keep_lines_max_fields>
  min?: Maybe<invoice_book_keep_lines_min_fields>
  stddev?: Maybe<invoice_book_keep_lines_stddev_fields>
  stddev_pop?: Maybe<invoice_book_keep_lines_stddev_pop_fields>
  stddev_samp?: Maybe<invoice_book_keep_lines_stddev_samp_fields>
  sum?: Maybe<invoice_book_keep_lines_sum_fields>
  var_pop?: Maybe<invoice_book_keep_lines_var_pop_fields>
  var_samp?: Maybe<invoice_book_keep_lines_var_samp_fields>
  variance?: Maybe<invoice_book_keep_lines_variance_fields>
}

/** aggregate fields of "invoice_book_keep_lines" */
export type invoice_book_keep_lines_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_aggregate_order_by = {
  avg?: InputMaybe<invoice_book_keep_lines_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<invoice_book_keep_lines_max_order_by>
  min?: InputMaybe<invoice_book_keep_lines_min_order_by>
  stddev?: InputMaybe<invoice_book_keep_lines_stddev_order_by>
  stddev_pop?: InputMaybe<invoice_book_keep_lines_stddev_pop_order_by>
  stddev_samp?: InputMaybe<invoice_book_keep_lines_stddev_samp_order_by>
  sum?: InputMaybe<invoice_book_keep_lines_sum_order_by>
  var_pop?: InputMaybe<invoice_book_keep_lines_var_pop_order_by>
  var_samp?: InputMaybe<invoice_book_keep_lines_var_samp_order_by>
  variance?: InputMaybe<invoice_book_keep_lines_variance_order_by>
}

/** input type for inserting array relation for remote table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_arr_rel_insert_input = {
  data: Array<invoice_book_keep_lines_insert_input>
  on_conflict?: InputMaybe<invoice_book_keep_lines_on_conflict>
}

/** aggregate avg on columns */
export type invoice_book_keep_lines_avg_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_avg_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "invoice_book_keep_lines". All fields are combined with a logical 'AND'. */
export type invoice_book_keep_lines_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<invoice_book_keep_lines_bool_exp>>>
  _not?: InputMaybe<invoice_book_keep_lines_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<invoice_book_keep_lines_bool_exp>>>
  account_id?: InputMaybe<String_comparison_exp>
  account_name?: InputMaybe<String_comparison_exp>
  book_keep_id?: InputMaybe<Int_comparison_exp>
  credit?: InputMaybe<Int_comparison_exp>
  debit?: InputMaybe<Int_comparison_exp>
  invoice_book_keep_header_rel?: InputMaybe<invoice_book_keep_headers_bool_exp>
  invoice_book_keep_lines_self_rel?: InputMaybe<invoice_book_keep_lines_bool_exp>
  invoice_book_keep_lines_self_relation?: InputMaybe<invoice_book_keep_lines_bool_exp>
  line_id?: InputMaybe<Int_comparison_exp>
}

/** unique or primary key constraints on table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_constraint =
  /** unique or primary key constraint */
  'invoice_book_keep_lines_pkey'

/** input type for incrementing integer columne in table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_inc_input = {
  book_keep_id?: InputMaybe<Scalars['Int']['input']>
  credit?: InputMaybe<Scalars['Int']['input']>
  debit?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_insert_input = {
  account_id?: InputMaybe<Scalars['String']['input']>
  account_name?: InputMaybe<Scalars['String']['input']>
  book_keep_id?: InputMaybe<Scalars['Int']['input']>
  credit?: InputMaybe<Scalars['Int']['input']>
  debit?: InputMaybe<Scalars['Int']['input']>
  invoice_book_keep_header_rel?: InputMaybe<invoice_book_keep_headers_obj_rel_insert_input>
  invoice_book_keep_lines_self_rel?: InputMaybe<invoice_book_keep_lines_arr_rel_insert_input>
  invoice_book_keep_lines_self_relation?: InputMaybe<invoice_book_keep_lines_arr_rel_insert_input>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate max on columns */
export type invoice_book_keep_lines_max_fields = {
  account_id?: Maybe<Scalars['String']['output']>
  account_name?: Maybe<Scalars['String']['output']>
  book_keep_id?: Maybe<Scalars['Int']['output']>
  credit?: Maybe<Scalars['Int']['output']>
  debit?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by max() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_max_order_by = {
  account_id?: InputMaybe<order_by>
  account_name?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type invoice_book_keep_lines_min_fields = {
  account_id?: Maybe<Scalars['String']['output']>
  account_name?: Maybe<Scalars['String']['output']>
  book_keep_id?: Maybe<Scalars['Int']['output']>
  credit?: Maybe<Scalars['Int']['output']>
  debit?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by min() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_min_order_by = {
  account_id?: InputMaybe<order_by>
  account_name?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<invoice_book_keep_lines>
}

/** input type for inserting object relation for remote table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_obj_rel_insert_input = {
  data: invoice_book_keep_lines_insert_input
  on_conflict?: InputMaybe<invoice_book_keep_lines_on_conflict>
}

/** on conflict condition type for table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_on_conflict = {
  constraint: invoice_book_keep_lines_constraint
  update_columns: Array<invoice_book_keep_lines_update_column>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** ordering options when selecting data from "invoice_book_keep_lines" */
export type invoice_book_keep_lines_order_by = {
  account_id?: InputMaybe<order_by>
  account_name?: InputMaybe<order_by>
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  invoice_book_keep_header_rel?: InputMaybe<invoice_book_keep_headers_order_by>
  invoice_book_keep_lines_self_rel_aggregate?: InputMaybe<invoice_book_keep_lines_aggregate_order_by>
  invoice_book_keep_lines_self_relation_aggregate?: InputMaybe<invoice_book_keep_lines_aggregate_order_by>
  line_id?: InputMaybe<order_by>
}

/** select columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_select_column =
  /** column name */
  | 'account_id'
  /** column name */
  | 'account_name'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'credit'
  /** column name */
  | 'debit'
  /** column name */
  | 'line_id'

/** input type for updating data in table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_set_input = {
  account_id?: InputMaybe<Scalars['String']['input']>
  account_name?: InputMaybe<Scalars['String']['input']>
  book_keep_id?: InputMaybe<Scalars['Int']['input']>
  credit?: InputMaybe<Scalars['Int']['input']>
  debit?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** aggregate stddev on columns */
export type invoice_book_keep_lines_stddev_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_stddev_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type invoice_book_keep_lines_stddev_pop_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_stddev_pop_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type invoice_book_keep_lines_stddev_samp_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_stddev_samp_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type invoice_book_keep_lines_sum_fields = {
  book_keep_id?: Maybe<Scalars['Int']['output']>
  credit?: Maybe<Scalars['Int']['output']>
  debit?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_sum_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** update columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_update_column =
  /** column name */
  | 'account_id'
  /** column name */
  | 'account_name'
  /** column name */
  | 'book_keep_id'
  /** column name */
  | 'credit'
  /** column name */
  | 'debit'
  /** column name */
  | 'line_id'

/** aggregate var_pop on columns */
export type invoice_book_keep_lines_var_pop_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_var_pop_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type invoice_book_keep_lines_var_samp_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_var_samp_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type invoice_book_keep_lines_variance_fields = {
  book_keep_id?: Maybe<Scalars['Float']['output']>
  credit?: Maybe<Scalars['Float']['output']>
  debit?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "invoice_book_keep_lines" */
export type invoice_book_keep_lines_variance_order_by = {
  book_keep_id?: InputMaybe<order_by>
  credit?: InputMaybe<order_by>
  debit?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** columns and relationships of "invoice_journal_headers" */
export type invoice_journal_headers = {
  /** An object relationship */
  company_rel: companies
  /** An array relationship */
  invoice_book_keep_headers_rel: Array<invoice_book_keep_headers>
  /** An aggregated array relationship */
  invoice_book_keep_headers_rel_aggregate: invoice_book_keep_headers_aggregate
  our_company: Scalars['String']['output']
  report_date: Scalars['date']['output']
  report_number: Scalars['Int']['output']
  report_type: Scalars['String']['output']
}

/** columns and relationships of "invoice_journal_headers" */
export type invoice_journal_headersinvoice_book_keep_headers_relArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_headers_order_by>>
  where?: InputMaybe<invoice_book_keep_headers_bool_exp>
}

/** columns and relationships of "invoice_journal_headers" */
export type invoice_journal_headersinvoice_book_keep_headers_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<invoice_book_keep_headers_order_by>>
    where?: InputMaybe<invoice_book_keep_headers_bool_exp>
  }

/** aggregated selection of "invoice_journal_headers" */
export type invoice_journal_headers_aggregate = {
  aggregate?: Maybe<invoice_journal_headers_aggregate_fields>
  nodes: Array<invoice_journal_headers>
}

/** aggregate fields of "invoice_journal_headers" */
export type invoice_journal_headers_aggregate_fields = {
  avg?: Maybe<invoice_journal_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<invoice_journal_headers_max_fields>
  min?: Maybe<invoice_journal_headers_min_fields>
  stddev?: Maybe<invoice_journal_headers_stddev_fields>
  stddev_pop?: Maybe<invoice_journal_headers_stddev_pop_fields>
  stddev_samp?: Maybe<invoice_journal_headers_stddev_samp_fields>
  sum?: Maybe<invoice_journal_headers_sum_fields>
  var_pop?: Maybe<invoice_journal_headers_var_pop_fields>
  var_samp?: Maybe<invoice_journal_headers_var_samp_fields>
  variance?: Maybe<invoice_journal_headers_variance_fields>
}

/** aggregate fields of "invoice_journal_headers" */
export type invoice_journal_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<invoice_journal_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "invoice_journal_headers" */
export type invoice_journal_headers_aggregate_order_by = {
  avg?: InputMaybe<invoice_journal_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<invoice_journal_headers_max_order_by>
  min?: InputMaybe<invoice_journal_headers_min_order_by>
  stddev?: InputMaybe<invoice_journal_headers_stddev_order_by>
  stddev_pop?: InputMaybe<invoice_journal_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<invoice_journal_headers_stddev_samp_order_by>
  sum?: InputMaybe<invoice_journal_headers_sum_order_by>
  var_pop?: InputMaybe<invoice_journal_headers_var_pop_order_by>
  var_samp?: InputMaybe<invoice_journal_headers_var_samp_order_by>
  variance?: InputMaybe<invoice_journal_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "invoice_journal_headers" */
export type invoice_journal_headers_arr_rel_insert_input = {
  data: Array<invoice_journal_headers_insert_input>
  on_conflict?: InputMaybe<invoice_journal_headers_on_conflict>
}

/** aggregate avg on columns */
export type invoice_journal_headers_avg_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_avg_order_by = {
  report_number?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "invoice_journal_headers". All fields are combined with a logical 'AND'. */
export type invoice_journal_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<invoice_journal_headers_bool_exp>>>
  _not?: InputMaybe<invoice_journal_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<invoice_journal_headers_bool_exp>>>
  company_rel?: InputMaybe<companies_bool_exp>
  invoice_book_keep_headers_rel?: InputMaybe<invoice_book_keep_headers_bool_exp>
  our_company?: InputMaybe<String_comparison_exp>
  report_date?: InputMaybe<date_comparison_exp>
  report_number?: InputMaybe<Int_comparison_exp>
  report_type?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "invoice_journal_headers" */
export type invoice_journal_headers_constraint =
  /** unique or primary key constraint */
  'invoice_journal_headers_pkey'

/** input type for incrementing integer columne in table "invoice_journal_headers" */
export type invoice_journal_headers_inc_input = {
  report_number?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "invoice_journal_headers" */
export type invoice_journal_headers_insert_input = {
  company_rel?: InputMaybe<companies_obj_rel_insert_input>
  invoice_book_keep_headers_rel?: InputMaybe<invoice_book_keep_headers_arr_rel_insert_input>
  our_company?: InputMaybe<Scalars['String']['input']>
  report_date?: InputMaybe<Scalars['date']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type invoice_journal_headers_max_fields = {
  our_company?: Maybe<Scalars['String']['output']>
  report_date?: Maybe<Scalars['date']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_max_order_by = {
  our_company?: InputMaybe<order_by>
  report_date?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type invoice_journal_headers_min_fields = {
  our_company?: Maybe<Scalars['String']['output']>
  report_date?: Maybe<Scalars['date']['output']>
  report_number?: Maybe<Scalars['Int']['output']>
  report_type?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_min_order_by = {
  our_company?: InputMaybe<order_by>
  report_date?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** response of any mutation on the table "invoice_journal_headers" */
export type invoice_journal_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<invoice_journal_headers>
}

/** input type for inserting object relation for remote table "invoice_journal_headers" */
export type invoice_journal_headers_obj_rel_insert_input = {
  data: invoice_journal_headers_insert_input
  on_conflict?: InputMaybe<invoice_journal_headers_on_conflict>
}

/** on conflict condition type for table "invoice_journal_headers" */
export type invoice_journal_headers_on_conflict = {
  constraint: invoice_journal_headers_constraint
  update_columns: Array<invoice_journal_headers_update_column>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** ordering options when selecting data from "invoice_journal_headers" */
export type invoice_journal_headers_order_by = {
  company_rel?: InputMaybe<companies_order_by>
  invoice_book_keep_headers_rel_aggregate?: InputMaybe<invoice_book_keep_headers_aggregate_order_by>
  our_company?: InputMaybe<order_by>
  report_date?: InputMaybe<order_by>
  report_number?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** select columns of table "invoice_journal_headers" */
export type invoice_journal_headers_select_column =
  /** column name */
  | 'our_company'
  /** column name */
  | 'report_date'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'

/** input type for updating data in table "invoice_journal_headers" */
export type invoice_journal_headers_set_input = {
  our_company?: InputMaybe<Scalars['String']['input']>
  report_date?: InputMaybe<Scalars['date']['input']>
  report_number?: InputMaybe<Scalars['Int']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type invoice_journal_headers_stddev_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_stddev_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type invoice_journal_headers_stddev_pop_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_stddev_pop_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type invoice_journal_headers_stddev_samp_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_stddev_samp_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type invoice_journal_headers_sum_fields = {
  report_number?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_sum_order_by = {
  report_number?: InputMaybe<order_by>
}

/** update columns of table "invoice_journal_headers" */
export type invoice_journal_headers_update_column =
  /** column name */
  | 'our_company'
  /** column name */
  | 'report_date'
  /** column name */
  | 'report_number'
  /** column name */
  | 'report_type'

/** aggregate var_pop on columns */
export type invoice_journal_headers_var_pop_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_var_pop_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type invoice_journal_headers_var_samp_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_var_samp_order_by = {
  report_number?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type invoice_journal_headers_variance_fields = {
  report_number?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "invoice_journal_headers" */
export type invoice_journal_headers_variance_order_by = {
  report_number?: InputMaybe<order_by>
}

/** mutation root */
export type mutation_root = {
  /** delete data from the table: "__admin_pass" */
  delete___admin_pass?: Maybe<__admin_pass_mutation_response>
  /** delete data from the table: "__privilege_pass" */
  delete___privilege_pass?: Maybe<__privilege_pass_mutation_response>
  /** delete data from the table: "_our_companies_persistent_state" */
  delete__our_companies_persistent_state?: Maybe<_our_companies_persistent_state_mutation_response>
  /** delete data from the table: "_type_account_plan" */
  delete__type_account_plan?: Maybe<_type_account_plan_mutation_response>
  /** delete data from the table: "_type_moms_code" */
  delete__type_moms_code?: Maybe<_type_moms_code_mutation_response>
  /** delete data from the table: "_type_stock_groups" */
  delete__type_stock_groups?: Maybe<_type_stock_groups_mutation_response>
  /** delete data from the table: "_type_stock_unit" */
  delete__type_stock_unit?: Maybe<_type_stock_unit_mutation_response>
  /** delete data from the table: "_ups_order_settings" */
  delete__ups_order_settings?: Maybe<_ups_order_settings_mutation_response>
  /** delete data from the table: "_ups_report_settings" */
  delete__ups_report_settings?: Maybe<_ups_report_settings_mutation_response>
  /** delete data from the table: "_user_persistent_state" */
  delete__user_persistent_state?: Maybe<_user_persistent_state_mutation_response>
  /** delete data from the table: "addresses" */
  delete_addresses?: Maybe<addresses_mutation_response>
  /** delete data from the table: "addresses_cities" */
  delete_addresses_cities?: Maybe<addresses_cities_mutation_response>
  /** delete data from the table: "addresses_opening_times" */
  delete_addresses_opening_times?: Maybe<addresses_opening_times_mutation_response>
  /** delete data from the table: "adresses_routes" */
  delete_adresses_routes?: Maybe<adresses_routes_mutation_response>
  /** delete data from the table: "bank_accounts" */
  delete_bank_accounts?: Maybe<bank_accounts_mutation_response>
  /** delete data from the table: "book_keep_headers" */
  delete_book_keep_headers?: Maybe<book_keep_headers_mutation_response>
  /** delete data from the table: "book_keep_lines" */
  delete_book_keep_lines?: Maybe<book_keep_lines_mutation_response>
  /** delete data from the table: "collect_payment_report_headers" */
  delete_collect_payment_report_headers?: Maybe<collect_payment_report_headers_mutation_response>
  /** delete data from the table: "companies" */
  delete_companies?: Maybe<companies_mutation_response>
  /** delete data from the table: "customer_bookmarks" */
  delete_customer_bookmarks?: Maybe<customer_bookmarks_mutation_response>
  /** delete data from the table: "customer_price_list" */
  delete_customer_price_list?: Maybe<customer_price_list_mutation_response>
  /** delete data from the table: "customers" */
  delete_customers?: Maybe<customers_mutation_response>
  /** delete data from the table: "customers_visits" */
  delete_customers_visits?: Maybe<customers_visits_mutation_response>
  /** delete data from the table: "deliveries" */
  delete_deliveries?: Maybe<deliveries_mutation_response>
  /** delete data from the table: "deliveries_list_lines" */
  delete_deliveries_list_lines?: Maybe<deliveries_list_lines_mutation_response>
  /** delete data from the table: "dispatch_headers" */
  delete_dispatch_headers?: Maybe<dispatch_headers_mutation_response>
  /** delete data from the table: "document_transactions" */
  delete_document_transactions?: Maybe<document_transactions_mutation_response>
  /** delete data from the table: "drivers" */
  delete_drivers?: Maybe<drivers_mutation_response>
  /** delete data from the table: "goods_transactions" */
  delete_goods_transactions?: Maybe<goods_transactions_mutation_response>
  /** delete data from the table: "invoice_book_keep_headers" */
  delete_invoice_book_keep_headers?: Maybe<invoice_book_keep_headers_mutation_response>
  /** delete data from the table: "invoice_book_keep_lines" */
  delete_invoice_book_keep_lines?: Maybe<invoice_book_keep_lines_mutation_response>
  /** delete data from the table: "invoice_journal_headers" */
  delete_invoice_journal_headers?: Maybe<invoice_journal_headers_mutation_response>
  /** delete data from the table: "order_headers" */
  delete_order_headers?: Maybe<order_headers_mutation_response>
  /** delete data from the table: "payments" */
  delete_payments?: Maybe<payments_mutation_response>
  /** delete data from the table: "reminder_headers" */
  delete_reminder_headers?: Maybe<reminder_headers_mutation_response>
  /** delete data from the table: "reminder_lines" */
  delete_reminder_lines?: Maybe<reminder_lines_mutation_response>
  /** delete data from the table: "route_names" */
  delete_route_names?: Maybe<route_names_mutation_response>
  /** delete data from the table: "stock" */
  delete_stock?: Maybe<stock_mutation_response>
  /** delete data from the table: "telephones" */
  delete_telephones?: Maybe<telephones_mutation_response>
  /** delete data from the table: "users" */
  delete_users?: Maybe<users_mutation_response>
  /** delete data from the table: "vehicles" */
  delete_vehicles?: Maybe<vehicles_mutation_response>
  /** insert data into the table: "__admin_pass" */
  insert___admin_pass?: Maybe<__admin_pass_mutation_response>
  /** insert data into the table: "__privilege_pass" */
  insert___privilege_pass?: Maybe<__privilege_pass_mutation_response>
  /** insert data into the table: "_our_companies_persistent_state" */
  insert__our_companies_persistent_state?: Maybe<_our_companies_persistent_state_mutation_response>
  /** insert data into the table: "_type_account_plan" */
  insert__type_account_plan?: Maybe<_type_account_plan_mutation_response>
  /** insert data into the table: "_type_moms_code" */
  insert__type_moms_code?: Maybe<_type_moms_code_mutation_response>
  /** insert data into the table: "_type_stock_groups" */
  insert__type_stock_groups?: Maybe<_type_stock_groups_mutation_response>
  /** insert data into the table: "_type_stock_unit" */
  insert__type_stock_unit?: Maybe<_type_stock_unit_mutation_response>
  /** insert data into the table: "_ups_order_settings" */
  insert__ups_order_settings?: Maybe<_ups_order_settings_mutation_response>
  /** insert data into the table: "_ups_report_settings" */
  insert__ups_report_settings?: Maybe<_ups_report_settings_mutation_response>
  /** insert data into the table: "_user_persistent_state" */
  insert__user_persistent_state?: Maybe<_user_persistent_state_mutation_response>
  /** insert data into the table: "addresses" */
  insert_addresses?: Maybe<addresses_mutation_response>
  /** insert data into the table: "addresses_cities" */
  insert_addresses_cities?: Maybe<addresses_cities_mutation_response>
  /** insert data into the table: "addresses_opening_times" */
  insert_addresses_opening_times?: Maybe<addresses_opening_times_mutation_response>
  /** insert data into the table: "adresses_routes" */
  insert_adresses_routes?: Maybe<adresses_routes_mutation_response>
  /** insert data into the table: "bank_accounts" */
  insert_bank_accounts?: Maybe<bank_accounts_mutation_response>
  /** insert data into the table: "book_keep_headers" */
  insert_book_keep_headers?: Maybe<book_keep_headers_mutation_response>
  /** insert data into the table: "book_keep_lines" */
  insert_book_keep_lines?: Maybe<book_keep_lines_mutation_response>
  /** insert data into the table: "collect_payment_report_headers" */
  insert_collect_payment_report_headers?: Maybe<collect_payment_report_headers_mutation_response>
  /** insert data into the table: "companies" */
  insert_companies?: Maybe<companies_mutation_response>
  /** insert data into the table: "customer_bookmarks" */
  insert_customer_bookmarks?: Maybe<customer_bookmarks_mutation_response>
  /** insert data into the table: "customer_price_list" */
  insert_customer_price_list?: Maybe<customer_price_list_mutation_response>
  /** insert data into the table: "customers" */
  insert_customers?: Maybe<customers_mutation_response>
  /** insert data into the table: "customers_visits" */
  insert_customers_visits?: Maybe<customers_visits_mutation_response>
  /** insert data into the table: "deliveries" */
  insert_deliveries?: Maybe<deliveries_mutation_response>
  /** insert data into the table: "deliveries_list_lines" */
  insert_deliveries_list_lines?: Maybe<deliveries_list_lines_mutation_response>
  /** insert data into the table: "dispatch_headers" */
  insert_dispatch_headers?: Maybe<dispatch_headers_mutation_response>
  /** insert data into the table: "document_transactions" */
  insert_document_transactions?: Maybe<document_transactions_mutation_response>
  /** insert data into the table: "drivers" */
  insert_drivers?: Maybe<drivers_mutation_response>
  /** insert data into the table: "goods_transactions" */
  insert_goods_transactions?: Maybe<goods_transactions_mutation_response>
  /** insert data into the table: "invoice_book_keep_headers" */
  insert_invoice_book_keep_headers?: Maybe<invoice_book_keep_headers_mutation_response>
  /** insert data into the table: "invoice_book_keep_lines" */
  insert_invoice_book_keep_lines?: Maybe<invoice_book_keep_lines_mutation_response>
  /** insert data into the table: "invoice_journal_headers" */
  insert_invoice_journal_headers?: Maybe<invoice_journal_headers_mutation_response>
  /** insert data into the table: "order_headers" */
  insert_order_headers?: Maybe<order_headers_mutation_response>
  /** insert data into the table: "payments" */
  insert_payments?: Maybe<payments_mutation_response>
  /** insert data into the table: "reminder_headers" */
  insert_reminder_headers?: Maybe<reminder_headers_mutation_response>
  /** insert data into the table: "reminder_lines" */
  insert_reminder_lines?: Maybe<reminder_lines_mutation_response>
  /** insert data into the table: "route_names" */
  insert_route_names?: Maybe<route_names_mutation_response>
  /** insert data into the table: "stock" */
  insert_stock?: Maybe<stock_mutation_response>
  /** insert data into the table: "telephones" */
  insert_telephones?: Maybe<telephones_mutation_response>
  /** insert data into the table: "users" */
  insert_users?: Maybe<users_mutation_response>
  /** insert data into the table: "vehicles" */
  insert_vehicles?: Maybe<vehicles_mutation_response>
  /** update data of the table: "__admin_pass" */
  update___admin_pass?: Maybe<__admin_pass_mutation_response>
  /** update data of the table: "__privilege_pass" */
  update___privilege_pass?: Maybe<__privilege_pass_mutation_response>
  /** update data of the table: "_our_companies_persistent_state" */
  update__our_companies_persistent_state?: Maybe<_our_companies_persistent_state_mutation_response>
  /** update data of the table: "_type_account_plan" */
  update__type_account_plan?: Maybe<_type_account_plan_mutation_response>
  /** update data of the table: "_type_moms_code" */
  update__type_moms_code?: Maybe<_type_moms_code_mutation_response>
  /** update data of the table: "_type_stock_groups" */
  update__type_stock_groups?: Maybe<_type_stock_groups_mutation_response>
  /** update data of the table: "_type_stock_unit" */
  update__type_stock_unit?: Maybe<_type_stock_unit_mutation_response>
  /** update data of the table: "_ups_order_settings" */
  update__ups_order_settings?: Maybe<_ups_order_settings_mutation_response>
  /** update data of the table: "_ups_report_settings" */
  update__ups_report_settings?: Maybe<_ups_report_settings_mutation_response>
  /** update data of the table: "_user_persistent_state" */
  update__user_persistent_state?: Maybe<_user_persistent_state_mutation_response>
  /** update data of the table: "addresses" */
  update_addresses?: Maybe<addresses_mutation_response>
  /** update data of the table: "addresses_cities" */
  update_addresses_cities?: Maybe<addresses_cities_mutation_response>
  /** update data of the table: "addresses_opening_times" */
  update_addresses_opening_times?: Maybe<addresses_opening_times_mutation_response>
  /** update data of the table: "adresses_routes" */
  update_adresses_routes?: Maybe<adresses_routes_mutation_response>
  /** update data of the table: "bank_accounts" */
  update_bank_accounts?: Maybe<bank_accounts_mutation_response>
  /** update data of the table: "book_keep_headers" */
  update_book_keep_headers?: Maybe<book_keep_headers_mutation_response>
  /** update data of the table: "book_keep_lines" */
  update_book_keep_lines?: Maybe<book_keep_lines_mutation_response>
  /** update data of the table: "collect_payment_report_headers" */
  update_collect_payment_report_headers?: Maybe<collect_payment_report_headers_mutation_response>
  /** update data of the table: "companies" */
  update_companies?: Maybe<companies_mutation_response>
  /** update data of the table: "customer_bookmarks" */
  update_customer_bookmarks?: Maybe<customer_bookmarks_mutation_response>
  /** update data of the table: "customer_price_list" */
  update_customer_price_list?: Maybe<customer_price_list_mutation_response>
  /** update data of the table: "customers" */
  update_customers?: Maybe<customers_mutation_response>
  /** update data of the table: "customers_visits" */
  update_customers_visits?: Maybe<customers_visits_mutation_response>
  /** update data of the table: "deliveries" */
  update_deliveries?: Maybe<deliveries_mutation_response>
  /** update data of the table: "deliveries_list_lines" */
  update_deliveries_list_lines?: Maybe<deliveries_list_lines_mutation_response>
  /** update data of the table: "dispatch_headers" */
  update_dispatch_headers?: Maybe<dispatch_headers_mutation_response>
  /** update data of the table: "document_transactions" */
  update_document_transactions?: Maybe<document_transactions_mutation_response>
  /** update data of the table: "drivers" */
  update_drivers?: Maybe<drivers_mutation_response>
  /** update data of the table: "goods_transactions" */
  update_goods_transactions?: Maybe<goods_transactions_mutation_response>
  /** update data of the table: "invoice_book_keep_headers" */
  update_invoice_book_keep_headers?: Maybe<invoice_book_keep_headers_mutation_response>
  /** update data of the table: "invoice_book_keep_lines" */
  update_invoice_book_keep_lines?: Maybe<invoice_book_keep_lines_mutation_response>
  /** update data of the table: "invoice_journal_headers" */
  update_invoice_journal_headers?: Maybe<invoice_journal_headers_mutation_response>
  /** update data of the table: "order_headers" */
  update_order_headers?: Maybe<order_headers_mutation_response>
  /** update data of the table: "payments" */
  update_payments?: Maybe<payments_mutation_response>
  /** update data of the table: "reminder_headers" */
  update_reminder_headers?: Maybe<reminder_headers_mutation_response>
  /** update data of the table: "reminder_lines" */
  update_reminder_lines?: Maybe<reminder_lines_mutation_response>
  /** update data of the table: "route_names" */
  update_route_names?: Maybe<route_names_mutation_response>
  /** update data of the table: "stock" */
  update_stock?: Maybe<stock_mutation_response>
  /** update data of the table: "telephones" */
  update_telephones?: Maybe<telephones_mutation_response>
  /** update data of the table: "users" */
  update_users?: Maybe<users_mutation_response>
  /** update data of the table: "vehicles" */
  update_vehicles?: Maybe<vehicles_mutation_response>
}

/** mutation root */
export type mutation_rootdelete___admin_passArgs = {
  where: __admin_pass_bool_exp
}

/** mutation root */
export type mutation_rootdelete___privilege_passArgs = {
  where: __privilege_pass_bool_exp
}

/** mutation root */
export type mutation_rootdelete__our_companies_persistent_stateArgs = {
  where: _our_companies_persistent_state_bool_exp
}

/** mutation root */
export type mutation_rootdelete__type_account_planArgs = {
  where: _type_account_plan_bool_exp
}

/** mutation root */
export type mutation_rootdelete__type_moms_codeArgs = {
  where: _type_moms_code_bool_exp
}

/** mutation root */
export type mutation_rootdelete__type_stock_groupsArgs = {
  where: _type_stock_groups_bool_exp
}

/** mutation root */
export type mutation_rootdelete__type_stock_unitArgs = {
  where: _type_stock_unit_bool_exp
}

/** mutation root */
export type mutation_rootdelete__ups_order_settingsArgs = {
  where: _ups_order_settings_bool_exp
}

/** mutation root */
export type mutation_rootdelete__ups_report_settingsArgs = {
  where: _ups_report_settings_bool_exp
}

/** mutation root */
export type mutation_rootdelete__user_persistent_stateArgs = {
  where: _user_persistent_state_bool_exp
}

/** mutation root */
export type mutation_rootdelete_addressesArgs = {
  where: addresses_bool_exp
}

/** mutation root */
export type mutation_rootdelete_addresses_citiesArgs = {
  where: addresses_cities_bool_exp
}

/** mutation root */
export type mutation_rootdelete_addresses_opening_timesArgs = {
  where: addresses_opening_times_bool_exp
}

/** mutation root */
export type mutation_rootdelete_adresses_routesArgs = {
  where: adresses_routes_bool_exp
}

/** mutation root */
export type mutation_rootdelete_bank_accountsArgs = {
  where: bank_accounts_bool_exp
}

/** mutation root */
export type mutation_rootdelete_book_keep_headersArgs = {
  where: book_keep_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_book_keep_linesArgs = {
  where: book_keep_lines_bool_exp
}

/** mutation root */
export type mutation_rootdelete_collect_payment_report_headersArgs = {
  where: collect_payment_report_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_companiesArgs = {
  where: companies_bool_exp
}

/** mutation root */
export type mutation_rootdelete_customer_bookmarksArgs = {
  where: customer_bookmarks_bool_exp
}

/** mutation root */
export type mutation_rootdelete_customer_price_listArgs = {
  where: customer_price_list_bool_exp
}

/** mutation root */
export type mutation_rootdelete_customersArgs = {
  where: customers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_customers_visitsArgs = {
  where: customers_visits_bool_exp
}

/** mutation root */
export type mutation_rootdelete_deliveriesArgs = {
  where: deliveries_bool_exp
}

/** mutation root */
export type mutation_rootdelete_deliveries_list_linesArgs = {
  where: deliveries_list_lines_bool_exp
}

/** mutation root */
export type mutation_rootdelete_dispatch_headersArgs = {
  where: dispatch_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_document_transactionsArgs = {
  where: document_transactions_bool_exp
}

/** mutation root */
export type mutation_rootdelete_driversArgs = {
  where: drivers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_goods_transactionsArgs = {
  where: goods_transactions_bool_exp
}

/** mutation root */
export type mutation_rootdelete_invoice_book_keep_headersArgs = {
  where: invoice_book_keep_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_invoice_book_keep_linesArgs = {
  where: invoice_book_keep_lines_bool_exp
}

/** mutation root */
export type mutation_rootdelete_invoice_journal_headersArgs = {
  where: invoice_journal_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_order_headersArgs = {
  where: order_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_paymentsArgs = {
  where: payments_bool_exp
}

/** mutation root */
export type mutation_rootdelete_reminder_headersArgs = {
  where: reminder_headers_bool_exp
}

/** mutation root */
export type mutation_rootdelete_reminder_linesArgs = {
  where: reminder_lines_bool_exp
}

/** mutation root */
export type mutation_rootdelete_route_namesArgs = {
  where: route_names_bool_exp
}

/** mutation root */
export type mutation_rootdelete_stockArgs = {
  where: stock_bool_exp
}

/** mutation root */
export type mutation_rootdelete_telephonesArgs = {
  where: telephones_bool_exp
}

/** mutation root */
export type mutation_rootdelete_usersArgs = {
  where: users_bool_exp
}

/** mutation root */
export type mutation_rootdelete_vehiclesArgs = {
  where: vehicles_bool_exp
}

/** mutation root */
export type mutation_rootinsert___admin_passArgs = {
  objects: Array<__admin_pass_insert_input>
  on_conflict?: InputMaybe<__admin_pass_on_conflict>
}

/** mutation root */
export type mutation_rootinsert___privilege_passArgs = {
  objects: Array<__privilege_pass_insert_input>
  on_conflict?: InputMaybe<__privilege_pass_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__our_companies_persistent_stateArgs = {
  objects: Array<_our_companies_persistent_state_insert_input>
  on_conflict?: InputMaybe<_our_companies_persistent_state_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__type_account_planArgs = {
  objects: Array<_type_account_plan_insert_input>
  on_conflict?: InputMaybe<_type_account_plan_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__type_moms_codeArgs = {
  objects: Array<_type_moms_code_insert_input>
  on_conflict?: InputMaybe<_type_moms_code_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__type_stock_groupsArgs = {
  objects: Array<_type_stock_groups_insert_input>
  on_conflict?: InputMaybe<_type_stock_groups_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__type_stock_unitArgs = {
  objects: Array<_type_stock_unit_insert_input>
  on_conflict?: InputMaybe<_type_stock_unit_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__ups_order_settingsArgs = {
  objects: Array<_ups_order_settings_insert_input>
  on_conflict?: InputMaybe<_ups_order_settings_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__ups_report_settingsArgs = {
  objects: Array<_ups_report_settings_insert_input>
  on_conflict?: InputMaybe<_ups_report_settings_on_conflict>
}

/** mutation root */
export type mutation_rootinsert__user_persistent_stateArgs = {
  objects: Array<_user_persistent_state_insert_input>
  on_conflict?: InputMaybe<_user_persistent_state_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_addressesArgs = {
  objects: Array<addresses_insert_input>
  on_conflict?: InputMaybe<addresses_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_addresses_citiesArgs = {
  objects: Array<addresses_cities_insert_input>
  on_conflict?: InputMaybe<addresses_cities_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_addresses_opening_timesArgs = {
  objects: Array<addresses_opening_times_insert_input>
  on_conflict?: InputMaybe<addresses_opening_times_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_adresses_routesArgs = {
  objects: Array<adresses_routes_insert_input>
  on_conflict?: InputMaybe<adresses_routes_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_bank_accountsArgs = {
  objects: Array<bank_accounts_insert_input>
  on_conflict?: InputMaybe<bank_accounts_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_book_keep_headersArgs = {
  objects: Array<book_keep_headers_insert_input>
  on_conflict?: InputMaybe<book_keep_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_book_keep_linesArgs = {
  objects: Array<book_keep_lines_insert_input>
  on_conflict?: InputMaybe<book_keep_lines_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_collect_payment_report_headersArgs = {
  objects: Array<collect_payment_report_headers_insert_input>
  on_conflict?: InputMaybe<collect_payment_report_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_companiesArgs = {
  objects: Array<companies_insert_input>
  on_conflict?: InputMaybe<companies_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_customer_bookmarksArgs = {
  objects: Array<customer_bookmarks_insert_input>
  on_conflict?: InputMaybe<customer_bookmarks_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_customer_price_listArgs = {
  objects: Array<customer_price_list_insert_input>
  on_conflict?: InputMaybe<customer_price_list_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_customersArgs = {
  objects: Array<customers_insert_input>
  on_conflict?: InputMaybe<customers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_customers_visitsArgs = {
  objects: Array<customers_visits_insert_input>
  on_conflict?: InputMaybe<customers_visits_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_deliveriesArgs = {
  objects: Array<deliveries_insert_input>
  on_conflict?: InputMaybe<deliveries_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_deliveries_list_linesArgs = {
  objects: Array<deliveries_list_lines_insert_input>
  on_conflict?: InputMaybe<deliveries_list_lines_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_dispatch_headersArgs = {
  objects: Array<dispatch_headers_insert_input>
  on_conflict?: InputMaybe<dispatch_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_document_transactionsArgs = {
  objects: Array<document_transactions_insert_input>
  on_conflict?: InputMaybe<document_transactions_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_driversArgs = {
  objects: Array<drivers_insert_input>
  on_conflict?: InputMaybe<drivers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_goods_transactionsArgs = {
  objects: Array<goods_transactions_insert_input>
  on_conflict?: InputMaybe<goods_transactions_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_invoice_book_keep_headersArgs = {
  objects: Array<invoice_book_keep_headers_insert_input>
  on_conflict?: InputMaybe<invoice_book_keep_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_invoice_book_keep_linesArgs = {
  objects: Array<invoice_book_keep_lines_insert_input>
  on_conflict?: InputMaybe<invoice_book_keep_lines_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_invoice_journal_headersArgs = {
  objects: Array<invoice_journal_headers_insert_input>
  on_conflict?: InputMaybe<invoice_journal_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_order_headersArgs = {
  objects: Array<order_headers_insert_input>
  on_conflict?: InputMaybe<order_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_paymentsArgs = {
  objects: Array<payments_insert_input>
  on_conflict?: InputMaybe<payments_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_reminder_headersArgs = {
  objects: Array<reminder_headers_insert_input>
  on_conflict?: InputMaybe<reminder_headers_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_reminder_linesArgs = {
  objects: Array<reminder_lines_insert_input>
  on_conflict?: InputMaybe<reminder_lines_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_route_namesArgs = {
  objects: Array<route_names_insert_input>
  on_conflict?: InputMaybe<route_names_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_stockArgs = {
  objects: Array<stock_insert_input>
  on_conflict?: InputMaybe<stock_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_telephonesArgs = {
  objects: Array<telephones_insert_input>
  on_conflict?: InputMaybe<telephones_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_usersArgs = {
  objects: Array<users_insert_input>
  on_conflict?: InputMaybe<users_on_conflict>
}

/** mutation root */
export type mutation_rootinsert_vehiclesArgs = {
  objects: Array<vehicles_insert_input>
  on_conflict?: InputMaybe<vehicles_on_conflict>
}

/** mutation root */
export type mutation_rootupdate___admin_passArgs = {
  _inc?: InputMaybe<__admin_pass_inc_input>
  _set?: InputMaybe<__admin_pass_set_input>
  where: __admin_pass_bool_exp
}

/** mutation root */
export type mutation_rootupdate___privilege_passArgs = {
  _inc?: InputMaybe<__privilege_pass_inc_input>
  _set?: InputMaybe<__privilege_pass_set_input>
  where: __privilege_pass_bool_exp
}

/** mutation root */
export type mutation_rootupdate__our_companies_persistent_stateArgs = {
  _set?: InputMaybe<_our_companies_persistent_state_set_input>
  where: _our_companies_persistent_state_bool_exp
}

/** mutation root */
export type mutation_rootupdate__type_account_planArgs = {
  _set?: InputMaybe<_type_account_plan_set_input>
  where: _type_account_plan_bool_exp
}

/** mutation root */
export type mutation_rootupdate__type_moms_codeArgs = {
  _inc?: InputMaybe<_type_moms_code_inc_input>
  _set?: InputMaybe<_type_moms_code_set_input>
  where: _type_moms_code_bool_exp
}

/** mutation root */
export type mutation_rootupdate__type_stock_groupsArgs = {
  _set?: InputMaybe<_type_stock_groups_set_input>
  where: _type_stock_groups_bool_exp
}

/** mutation root */
export type mutation_rootupdate__type_stock_unitArgs = {
  _set?: InputMaybe<_type_stock_unit_set_input>
  where: _type_stock_unit_bool_exp
}

/** mutation root */
export type mutation_rootupdate__ups_order_settingsArgs = {
  _set?: InputMaybe<_ups_order_settings_set_input>
  where: _ups_order_settings_bool_exp
}

/** mutation root */
export type mutation_rootupdate__ups_report_settingsArgs = {
  _set?: InputMaybe<_ups_report_settings_set_input>
  where: _ups_report_settings_bool_exp
}

/** mutation root */
export type mutation_rootupdate__user_persistent_stateArgs = {
  _set?: InputMaybe<_user_persistent_state_set_input>
  where: _user_persistent_state_bool_exp
}

/** mutation root */
export type mutation_rootupdate_addressesArgs = {
  _set?: InputMaybe<addresses_set_input>
  where: addresses_bool_exp
}

/** mutation root */
export type mutation_rootupdate_addresses_citiesArgs = {
  _set?: InputMaybe<addresses_cities_set_input>
  where: addresses_cities_bool_exp
}

/** mutation root */
export type mutation_rootupdate_addresses_opening_timesArgs = {
  _inc?: InputMaybe<addresses_opening_times_inc_input>
  _set?: InputMaybe<addresses_opening_times_set_input>
  where: addresses_opening_times_bool_exp
}

/** mutation root */
export type mutation_rootupdate_adresses_routesArgs = {
  _inc?: InputMaybe<adresses_routes_inc_input>
  _set?: InputMaybe<adresses_routes_set_input>
  where: adresses_routes_bool_exp
}

/** mutation root */
export type mutation_rootupdate_bank_accountsArgs = {
  _set?: InputMaybe<bank_accounts_set_input>
  where: bank_accounts_bool_exp
}

/** mutation root */
export type mutation_rootupdate_book_keep_headersArgs = {
  _inc?: InputMaybe<book_keep_headers_inc_input>
  _set?: InputMaybe<book_keep_headers_set_input>
  where: book_keep_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_book_keep_linesArgs = {
  _inc?: InputMaybe<book_keep_lines_inc_input>
  _set?: InputMaybe<book_keep_lines_set_input>
  where: book_keep_lines_bool_exp
}

/** mutation root */
export type mutation_rootupdate_collect_payment_report_headersArgs = {
  _inc?: InputMaybe<collect_payment_report_headers_inc_input>
  _set?: InputMaybe<collect_payment_report_headers_set_input>
  where: collect_payment_report_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_companiesArgs = {
  _inc?: InputMaybe<companies_inc_input>
  _set?: InputMaybe<companies_set_input>
  where: companies_bool_exp
}

/** mutation root */
export type mutation_rootupdate_customer_bookmarksArgs = {
  _set?: InputMaybe<customer_bookmarks_set_input>
  where: customer_bookmarks_bool_exp
}

/** mutation root */
export type mutation_rootupdate_customer_price_listArgs = {
  _inc?: InputMaybe<customer_price_list_inc_input>
  _set?: InputMaybe<customer_price_list_set_input>
  where: customer_price_list_bool_exp
}

/** mutation root */
export type mutation_rootupdate_customersArgs = {
  _inc?: InputMaybe<customers_inc_input>
  _set?: InputMaybe<customers_set_input>
  where: customers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_customers_visitsArgs = {
  _inc?: InputMaybe<customers_visits_inc_input>
  _set?: InputMaybe<customers_visits_set_input>
  where: customers_visits_bool_exp
}

/** mutation root */
export type mutation_rootupdate_deliveriesArgs = {
  _inc?: InputMaybe<deliveries_inc_input>
  _set?: InputMaybe<deliveries_set_input>
  where: deliveries_bool_exp
}

/** mutation root */
export type mutation_rootupdate_deliveries_list_linesArgs = {
  _inc?: InputMaybe<deliveries_list_lines_inc_input>
  _set?: InputMaybe<deliveries_list_lines_set_input>
  where: deliveries_list_lines_bool_exp
}

/** mutation root */
export type mutation_rootupdate_dispatch_headersArgs = {
  _set?: InputMaybe<dispatch_headers_set_input>
  where: dispatch_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_document_transactionsArgs = {
  _inc?: InputMaybe<document_transactions_inc_input>
  _set?: InputMaybe<document_transactions_set_input>
  where: document_transactions_bool_exp
}

/** mutation root */
export type mutation_rootupdate_driversArgs = {
  _inc?: InputMaybe<drivers_inc_input>
  _set?: InputMaybe<drivers_set_input>
  where: drivers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_goods_transactionsArgs = {
  _inc?: InputMaybe<goods_transactions_inc_input>
  _set?: InputMaybe<goods_transactions_set_input>
  where: goods_transactions_bool_exp
}

/** mutation root */
export type mutation_rootupdate_invoice_book_keep_headersArgs = {
  _inc?: InputMaybe<invoice_book_keep_headers_inc_input>
  _set?: InputMaybe<invoice_book_keep_headers_set_input>
  where: invoice_book_keep_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_invoice_book_keep_linesArgs = {
  _inc?: InputMaybe<invoice_book_keep_lines_inc_input>
  _set?: InputMaybe<invoice_book_keep_lines_set_input>
  where: invoice_book_keep_lines_bool_exp
}

/** mutation root */
export type mutation_rootupdate_invoice_journal_headersArgs = {
  _inc?: InputMaybe<invoice_journal_headers_inc_input>
  _set?: InputMaybe<invoice_journal_headers_set_input>
  where: invoice_journal_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_order_headersArgs = {
  _set?: InputMaybe<order_headers_set_input>
  where: order_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_paymentsArgs = {
  _inc?: InputMaybe<payments_inc_input>
  _set?: InputMaybe<payments_set_input>
  where: payments_bool_exp
}

/** mutation root */
export type mutation_rootupdate_reminder_headersArgs = {
  _inc?: InputMaybe<reminder_headers_inc_input>
  _set?: InputMaybe<reminder_headers_set_input>
  where: reminder_headers_bool_exp
}

/** mutation root */
export type mutation_rootupdate_reminder_linesArgs = {
  _inc?: InputMaybe<reminder_lines_inc_input>
  _set?: InputMaybe<reminder_lines_set_input>
  where: reminder_lines_bool_exp
}

/** mutation root */
export type mutation_rootupdate_route_namesArgs = {
  _set?: InputMaybe<route_names_set_input>
  where: route_names_bool_exp
}

/** mutation root */
export type mutation_rootupdate_stockArgs = {
  _inc?: InputMaybe<stock_inc_input>
  _set?: InputMaybe<stock_set_input>
  where: stock_bool_exp
}

/** mutation root */
export type mutation_rootupdate_telephonesArgs = {
  _set?: InputMaybe<telephones_set_input>
  where: telephones_bool_exp
}

/** mutation root */
export type mutation_rootupdate_usersArgs = {
  _set?: InputMaybe<users_set_input>
  where: users_bool_exp
}

/** mutation root */
export type mutation_rootupdate_vehiclesArgs = {
  _set?: InputMaybe<vehicles_set_input>
  where: vehicles_bool_exp
}

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type numeric_comparison_exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>
  _gt?: InputMaybe<Scalars['numeric']['input']>
  _gte?: InputMaybe<Scalars['numeric']['input']>
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['numeric']['input']>
  _lte?: InputMaybe<Scalars['numeric']['input']>
  _neq?: InputMaybe<Scalars['numeric']['input']>
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>
}

/** column ordering options */
export type order_by =
  /** in the ascending order, nulls last */
  | 'asc'
  /** in the ascending order, nulls first */
  | 'asc_nulls_first'
  /** in the ascending order, nulls last */
  | 'asc_nulls_last'
  /** in the descending order, nulls first */
  | 'desc'
  /** in the descending order, nulls first */
  | 'desc_nulls_first'
  /** in the descending order, nulls last */
  | 'desc_nulls_last'

/** columns and relationships of "order_headers" */
export type order_headers = {
  /** An object relationship */
  _customer?: Maybe<customers>
  /** An object relationship */
  _dispatch_address?: Maybe<addresses>
  /** An array relationship */
  _goods_transactions: Array<goods_transactions>
  /** An aggregated array relationship */
  _goods_transactions_aggregate: goods_transactions_aggregate
  /** An object relationship */
  company: companies
  company_id: Scalars['String']['output']
  /** An object relationship */
  customer: customers
  customer_id: Scalars['String']['output']
  dispatch_address_id?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  order_canceled: Scalars['Boolean']['output']
  order_date: Scalars['date']['output']
  order_dispatched: Scalars['Boolean']['output']
  order_exchange_rate: Scalars['numeric']['output']
  order_exchange_unit: Scalars['String']['output']
  /** An object relationship */
  order_headers_dispatch_address_addresses_rel?: Maybe<addresses>
  /** An object relationship */
  order_headers_invoice_address_addresses_rel?: Maybe<addresses>
  /** An array relationship */
  order_heders_goods_transactions_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  order_heders_goods_transactions_rel_aggregate: goods_transactions_aggregate
  order_language: Scalars['String']['output']
  order_lock: Scalars['Boolean']['output']
  order_number: Scalars['String']['output']
  order_source: Scalars['String']['output']
  order_type: Scalars['String']['output']
}

/** columns and relationships of "order_headers" */
export type order_headers_goods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "order_headers" */
export type order_headers_goods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "order_headers" */
export type order_headersorder_heders_goods_transactions_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "order_headers" */
export type order_headersorder_heders_goods_transactions_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** aggregated selection of "order_headers" */
export type order_headers_aggregate = {
  aggregate?: Maybe<order_headers_aggregate_fields>
  nodes: Array<order_headers>
}

/** aggregate fields of "order_headers" */
export type order_headers_aggregate_fields = {
  avg?: Maybe<order_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<order_headers_max_fields>
  min?: Maybe<order_headers_min_fields>
  stddev?: Maybe<order_headers_stddev_fields>
  stddev_pop?: Maybe<order_headers_stddev_pop_fields>
  stddev_samp?: Maybe<order_headers_stddev_samp_fields>
  sum?: Maybe<order_headers_sum_fields>
  var_pop?: Maybe<order_headers_var_pop_fields>
  var_samp?: Maybe<order_headers_var_samp_fields>
  variance?: Maybe<order_headers_variance_fields>
}

/** aggregate fields of "order_headers" */
export type order_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<order_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "order_headers" */
export type order_headers_aggregate_order_by = {
  avg?: InputMaybe<order_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<order_headers_max_order_by>
  min?: InputMaybe<order_headers_min_order_by>
  stddev?: InputMaybe<order_headers_stddev_order_by>
  stddev_pop?: InputMaybe<order_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<order_headers_stddev_samp_order_by>
  sum?: InputMaybe<order_headers_sum_order_by>
  var_pop?: InputMaybe<order_headers_var_pop_order_by>
  var_samp?: InputMaybe<order_headers_var_samp_order_by>
  variance?: InputMaybe<order_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "order_headers" */
export type order_headers_arr_rel_insert_input = {
  data: Array<order_headers_insert_input>
  on_conflict?: InputMaybe<order_headers_on_conflict>
}

/** aggregate avg on columns */
export type order_headers_avg_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "order_headers" */
export type order_headers_avg_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "order_headers". All fields are combined with a logical 'AND'. */
export type order_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<order_headers_bool_exp>>>
  _customer?: InputMaybe<customers_bool_exp>
  _dispatch_address?: InputMaybe<addresses_bool_exp>
  _goods_transactions?: InputMaybe<goods_transactions_bool_exp>
  _not?: InputMaybe<order_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<order_headers_bool_exp>>>
  company?: InputMaybe<companies_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  customer?: InputMaybe<customers_bool_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  dispatch_address_id?: InputMaybe<String_comparison_exp>
  invoice_address_id?: InputMaybe<String_comparison_exp>
  order_canceled?: InputMaybe<Boolean_comparison_exp>
  order_date?: InputMaybe<date_comparison_exp>
  order_dispatched?: InputMaybe<Boolean_comparison_exp>
  order_exchange_rate?: InputMaybe<numeric_comparison_exp>
  order_exchange_unit?: InputMaybe<String_comparison_exp>
  order_headers_dispatch_address_addresses_rel?: InputMaybe<addresses_bool_exp>
  order_headers_invoice_address_addresses_rel?: InputMaybe<addresses_bool_exp>
  order_heders_goods_transactions_rel?: InputMaybe<goods_transactions_bool_exp>
  order_language?: InputMaybe<String_comparison_exp>
  order_lock?: InputMaybe<Boolean_comparison_exp>
  order_number?: InputMaybe<String_comparison_exp>
  order_source?: InputMaybe<String_comparison_exp>
  order_type?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "order_headers" */
export type order_headers_constraint =
  /** unique or primary key constraint */
  'order_headers_pkey'

/** input type for inserting data into table "order_headers" */
export type order_headers_insert_input = {
  _customer?: InputMaybe<customers_obj_rel_insert_input>
  _dispatch_address?: InputMaybe<addresses_obj_rel_insert_input>
  _goods_transactions?: InputMaybe<goods_transactions_arr_rel_insert_input>
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  customer?: InputMaybe<customers_obj_rel_insert_input>
  customer_id?: InputMaybe<Scalars['String']['input']>
  dispatch_address_id?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  order_canceled?: InputMaybe<Scalars['Boolean']['input']>
  order_date?: InputMaybe<Scalars['date']['input']>
  order_dispatched?: InputMaybe<Scalars['Boolean']['input']>
  order_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  order_exchange_unit?: InputMaybe<Scalars['String']['input']>
  order_headers_dispatch_address_addresses_rel?: InputMaybe<addresses_obj_rel_insert_input>
  order_headers_invoice_address_addresses_rel?: InputMaybe<addresses_obj_rel_insert_input>
  order_heders_goods_transactions_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  order_language?: InputMaybe<Scalars['String']['input']>
  order_lock?: InputMaybe<Scalars['Boolean']['input']>
  order_number?: InputMaybe<Scalars['String']['input']>
  order_source?: InputMaybe<Scalars['String']['input']>
  order_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type order_headers_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  dispatch_address_id?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  order_date?: Maybe<Scalars['date']['output']>
  order_exchange_rate?: Maybe<Scalars['numeric']['output']>
  order_exchange_unit?: Maybe<Scalars['String']['output']>
  order_language?: Maybe<Scalars['String']['output']>
  order_number?: Maybe<Scalars['String']['output']>
  order_source?: Maybe<Scalars['String']['output']>
  order_type?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "order_headers" */
export type order_headers_max_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  dispatch_address_id?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  order_date?: InputMaybe<order_by>
  order_exchange_rate?: InputMaybe<order_by>
  order_exchange_unit?: InputMaybe<order_by>
  order_language?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  order_source?: InputMaybe<order_by>
  order_type?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type order_headers_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  dispatch_address_id?: Maybe<Scalars['String']['output']>
  invoice_address_id?: Maybe<Scalars['String']['output']>
  order_date?: Maybe<Scalars['date']['output']>
  order_exchange_rate?: Maybe<Scalars['numeric']['output']>
  order_exchange_unit?: Maybe<Scalars['String']['output']>
  order_language?: Maybe<Scalars['String']['output']>
  order_number?: Maybe<Scalars['String']['output']>
  order_source?: Maybe<Scalars['String']['output']>
  order_type?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "order_headers" */
export type order_headers_min_order_by = {
  company_id?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  dispatch_address_id?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  order_date?: InputMaybe<order_by>
  order_exchange_rate?: InputMaybe<order_by>
  order_exchange_unit?: InputMaybe<order_by>
  order_language?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  order_source?: InputMaybe<order_by>
  order_type?: InputMaybe<order_by>
}

/** response of any mutation on the table "order_headers" */
export type order_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<order_headers>
}

/** input type for inserting object relation for remote table "order_headers" */
export type order_headers_obj_rel_insert_input = {
  data: order_headers_insert_input
  on_conflict?: InputMaybe<order_headers_on_conflict>
}

/** on conflict condition type for table "order_headers" */
export type order_headers_on_conflict = {
  constraint: order_headers_constraint
  update_columns: Array<order_headers_update_column>
  where?: InputMaybe<order_headers_bool_exp>
}

/** ordering options when selecting data from "order_headers" */
export type order_headers_order_by = {
  _customer?: InputMaybe<customers_order_by>
  _dispatch_address?: InputMaybe<addresses_order_by>
  _goods_transactions_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  company?: InputMaybe<companies_order_by>
  company_id?: InputMaybe<order_by>
  customer?: InputMaybe<customers_order_by>
  customer_id?: InputMaybe<order_by>
  dispatch_address_id?: InputMaybe<order_by>
  invoice_address_id?: InputMaybe<order_by>
  order_canceled?: InputMaybe<order_by>
  order_date?: InputMaybe<order_by>
  order_dispatched?: InputMaybe<order_by>
  order_exchange_rate?: InputMaybe<order_by>
  order_exchange_unit?: InputMaybe<order_by>
  order_headers_dispatch_address_addresses_rel?: InputMaybe<addresses_order_by>
  order_headers_invoice_address_addresses_rel?: InputMaybe<addresses_order_by>
  order_heders_goods_transactions_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  order_language?: InputMaybe<order_by>
  order_lock?: InputMaybe<order_by>
  order_number?: InputMaybe<order_by>
  order_source?: InputMaybe<order_by>
  order_type?: InputMaybe<order_by>
}

/** select columns of table "order_headers" */
export type order_headers_select_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'dispatch_address_id'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'order_canceled'
  /** column name */
  | 'order_date'
  /** column name */
  | 'order_dispatched'
  /** column name */
  | 'order_exchange_rate'
  /** column name */
  | 'order_exchange_unit'
  /** column name */
  | 'order_language'
  /** column name */
  | 'order_lock'
  /** column name */
  | 'order_number'
  /** column name */
  | 'order_source'
  /** column name */
  | 'order_type'

/** input type for updating data in table "order_headers" */
export type order_headers_set_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  dispatch_address_id?: InputMaybe<Scalars['String']['input']>
  invoice_address_id?: InputMaybe<Scalars['String']['input']>
  order_canceled?: InputMaybe<Scalars['Boolean']['input']>
  order_date?: InputMaybe<Scalars['date']['input']>
  order_dispatched?: InputMaybe<Scalars['Boolean']['input']>
  order_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  order_exchange_unit?: InputMaybe<Scalars['String']['input']>
  order_language?: InputMaybe<Scalars['String']['input']>
  order_lock?: InputMaybe<Scalars['Boolean']['input']>
  order_number?: InputMaybe<Scalars['String']['input']>
  order_source?: InputMaybe<Scalars['String']['input']>
  order_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type order_headers_stddev_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "order_headers" */
export type order_headers_stddev_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type order_headers_stddev_pop_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "order_headers" */
export type order_headers_stddev_pop_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type order_headers_stddev_samp_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "order_headers" */
export type order_headers_stddev_samp_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type order_headers_sum_fields = {
  order_exchange_rate?: Maybe<Scalars['numeric']['output']>
}

/** order by sum() on columns of table "order_headers" */
export type order_headers_sum_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** update columns of table "order_headers" */
export type order_headers_update_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'dispatch_address_id'
  /** column name */
  | 'invoice_address_id'
  /** column name */
  | 'order_canceled'
  /** column name */
  | 'order_date'
  /** column name */
  | 'order_dispatched'
  /** column name */
  | 'order_exchange_rate'
  /** column name */
  | 'order_exchange_unit'
  /** column name */
  | 'order_language'
  /** column name */
  | 'order_lock'
  /** column name */
  | 'order_number'
  /** column name */
  | 'order_source'
  /** column name */
  | 'order_type'

/** aggregate var_pop on columns */
export type order_headers_var_pop_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "order_headers" */
export type order_headers_var_pop_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type order_headers_var_samp_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "order_headers" */
export type order_headers_var_samp_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type order_headers_variance_fields = {
  order_exchange_rate?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "order_headers" */
export type order_headers_variance_order_by = {
  order_exchange_rate?: InputMaybe<order_by>
}

/** columns and relationships of "payments" */
export type payments = {
  /** An object relationship */
  _customers?: Maybe<customers>
  /** An object relationship */
  _document_transactions?: Maybe<document_transactions>
  /** An array relationship */
  _goods_transactions: Array<goods_transactions>
  /** An aggregated array relationship */
  _goods_transactions_aggregate: goods_transactions_aggregate
  /** An object relationship */
  _payments_payments_rel?: Maybe<payments>
  customer_id?: Maybe<Scalars['String']['output']>
  invoice_number: Scalars['String']['output']
  is_payment_bookkept: Scalars['Boolean']['output']
  our_company: Scalars['String']['output']
  payment_credit: Scalars['Int']['output']
  payment_credit_account: Scalars['String']['output']
  payment_credit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_currency?: Maybe<Scalars['String']['output']>
  payment_date: Scalars['date']['output']
  payment_debit: Scalars['Int']['output']
  payment_debit_account: Scalars['String']['output']
  payment_debit_in_exchange?: Maybe<Scalars['Int']['output']>
  /** An object relationship */
  payment_document_transactions_rel?: Maybe<document_transactions>
  payment_exchange_difference?: Maybe<Scalars['Int']['output']>
  payment_exchange_rate?: Maybe<Scalars['numeric']['output']>
  payment_id: Scalars['Int']['output']
  payment_type: Scalars['String']['output']
  /** An array relationship */
  payments_contra_account_rel: Array<payments>
  /** An aggregated array relationship */
  payments_contra_account_rel_aggregate: payments_aggregate
  /** An array relationship */
  payments_goods_transactions_rel: Array<goods_transactions>
  /** An aggregated array relationship */
  payments_goods_transactions_rel_aggregate: goods_transactions_aggregate
  /** An array relationship */
  payments_payment_account_rel: Array<payments>
  /** An aggregated array relationship */
  payments_payment_account_rel_aggregate: payments_aggregate
  /** An object relationship */
  pyments_customers_rel?: Maybe<customers>
  report_type?: Maybe<Scalars['String']['output']>
}

/** columns and relationships of "payments" */
export type payments_goods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "payments" */
export type payments_goods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "payments" */
export type paymentspayments_contra_account_relArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** columns and relationships of "payments" */
export type paymentspayments_contra_account_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** columns and relationships of "payments" */
export type paymentspayments_goods_transactions_relArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "payments" */
export type paymentspayments_goods_transactions_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "payments" */
export type paymentspayments_payment_account_relArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** columns and relationships of "payments" */
export type paymentspayments_payment_account_rel_aggregateArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** aggregated selection of "payments" */
export type payments_aggregate = {
  aggregate?: Maybe<payments_aggregate_fields>
  nodes: Array<payments>
}

/** aggregate fields of "payments" */
export type payments_aggregate_fields = {
  avg?: Maybe<payments_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<payments_max_fields>
  min?: Maybe<payments_min_fields>
  stddev?: Maybe<payments_stddev_fields>
  stddev_pop?: Maybe<payments_stddev_pop_fields>
  stddev_samp?: Maybe<payments_stddev_samp_fields>
  sum?: Maybe<payments_sum_fields>
  var_pop?: Maybe<payments_var_pop_fields>
  var_samp?: Maybe<payments_var_samp_fields>
  variance?: Maybe<payments_variance_fields>
}

/** aggregate fields of "payments" */
export type payments_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<payments_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "payments" */
export type payments_aggregate_order_by = {
  avg?: InputMaybe<payments_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<payments_max_order_by>
  min?: InputMaybe<payments_min_order_by>
  stddev?: InputMaybe<payments_stddev_order_by>
  stddev_pop?: InputMaybe<payments_stddev_pop_order_by>
  stddev_samp?: InputMaybe<payments_stddev_samp_order_by>
  sum?: InputMaybe<payments_sum_order_by>
  var_pop?: InputMaybe<payments_var_pop_order_by>
  var_samp?: InputMaybe<payments_var_samp_order_by>
  variance?: InputMaybe<payments_variance_order_by>
}

/** input type for inserting array relation for remote table "payments" */
export type payments_arr_rel_insert_input = {
  data: Array<payments_insert_input>
  on_conflict?: InputMaybe<payments_on_conflict>
}

/** aggregate avg on columns */
export type payments_avg_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "payments" */
export type payments_avg_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "payments". All fields are combined with a logical 'AND'. */
export type payments_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<payments_bool_exp>>>
  _customers?: InputMaybe<customers_bool_exp>
  _document_transactions?: InputMaybe<document_transactions_bool_exp>
  _goods_transactions?: InputMaybe<goods_transactions_bool_exp>
  _not?: InputMaybe<payments_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<payments_bool_exp>>>
  _payments_payments_rel?: InputMaybe<payments_bool_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  invoice_number?: InputMaybe<String_comparison_exp>
  is_payment_bookkept?: InputMaybe<Boolean_comparison_exp>
  our_company?: InputMaybe<String_comparison_exp>
  payment_credit?: InputMaybe<Int_comparison_exp>
  payment_credit_account?: InputMaybe<String_comparison_exp>
  payment_credit_in_exchange?: InputMaybe<Int_comparison_exp>
  payment_currency?: InputMaybe<String_comparison_exp>
  payment_date?: InputMaybe<date_comparison_exp>
  payment_debit?: InputMaybe<Int_comparison_exp>
  payment_debit_account?: InputMaybe<String_comparison_exp>
  payment_debit_in_exchange?: InputMaybe<Int_comparison_exp>
  payment_document_transactions_rel?: InputMaybe<document_transactions_bool_exp>
  payment_exchange_difference?: InputMaybe<Int_comparison_exp>
  payment_exchange_rate?: InputMaybe<numeric_comparison_exp>
  payment_id?: InputMaybe<Int_comparison_exp>
  payment_type?: InputMaybe<String_comparison_exp>
  payments_contra_account_rel?: InputMaybe<payments_bool_exp>
  payments_goods_transactions_rel?: InputMaybe<goods_transactions_bool_exp>
  payments_payment_account_rel?: InputMaybe<payments_bool_exp>
  pyments_customers_rel?: InputMaybe<customers_bool_exp>
  report_type?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "payments" */
export type payments_constraint =
  /** unique or primary key constraint */
  'payments_pkey'

/** input type for incrementing integer columne in table "payments" */
export type payments_inc_input = {
  payment_credit?: InputMaybe<Scalars['Int']['input']>
  payment_credit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  payment_debit?: InputMaybe<Scalars['Int']['input']>
  payment_debit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  payment_exchange_difference?: InputMaybe<Scalars['Int']['input']>
  payment_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "payments" */
export type payments_insert_input = {
  _customers?: InputMaybe<customers_obj_rel_insert_input>
  _document_transactions?: InputMaybe<document_transactions_obj_rel_insert_input>
  _goods_transactions?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _payments_payments_rel?: InputMaybe<payments_obj_rel_insert_input>
  customer_id?: InputMaybe<Scalars['String']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  is_payment_bookkept?: InputMaybe<Scalars['Boolean']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  payment_credit?: InputMaybe<Scalars['Int']['input']>
  payment_credit_account?: InputMaybe<Scalars['String']['input']>
  payment_credit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  payment_currency?: InputMaybe<Scalars['String']['input']>
  payment_date?: InputMaybe<Scalars['date']['input']>
  payment_debit?: InputMaybe<Scalars['Int']['input']>
  payment_debit_account?: InputMaybe<Scalars['String']['input']>
  payment_debit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  payment_document_transactions_rel?: InputMaybe<document_transactions_obj_rel_insert_input>
  payment_exchange_difference?: InputMaybe<Scalars['Int']['input']>
  payment_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  payment_id?: InputMaybe<Scalars['Int']['input']>
  payment_type?: InputMaybe<Scalars['String']['input']>
  payments_contra_account_rel?: InputMaybe<payments_arr_rel_insert_input>
  payments_goods_transactions_rel?: InputMaybe<goods_transactions_arr_rel_insert_input>
  payments_payment_account_rel?: InputMaybe<payments_arr_rel_insert_input>
  pyments_customers_rel?: InputMaybe<customers_obj_rel_insert_input>
  report_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type payments_max_fields = {
  customer_id?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  payment_credit?: Maybe<Scalars['Int']['output']>
  payment_credit_account?: Maybe<Scalars['String']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_currency?: Maybe<Scalars['String']['output']>
  payment_date?: Maybe<Scalars['date']['output']>
  payment_debit?: Maybe<Scalars['Int']['output']>
  payment_debit_account?: Maybe<Scalars['String']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_exchange_difference?: Maybe<Scalars['Int']['output']>
  payment_exchange_rate?: Maybe<Scalars['numeric']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
  payment_type?: Maybe<Scalars['String']['output']>
  report_type?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "payments" */
export type payments_max_order_by = {
  customer_id?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  payment_credit?: InputMaybe<order_by>
  payment_credit_account?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_currency?: InputMaybe<order_by>
  payment_date?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_account?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  payment_type?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type payments_min_fields = {
  customer_id?: Maybe<Scalars['String']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  payment_credit?: Maybe<Scalars['Int']['output']>
  payment_credit_account?: Maybe<Scalars['String']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_currency?: Maybe<Scalars['String']['output']>
  payment_date?: Maybe<Scalars['date']['output']>
  payment_debit?: Maybe<Scalars['Int']['output']>
  payment_debit_account?: Maybe<Scalars['String']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_exchange_difference?: Maybe<Scalars['Int']['output']>
  payment_exchange_rate?: Maybe<Scalars['numeric']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
  payment_type?: Maybe<Scalars['String']['output']>
  report_type?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "payments" */
export type payments_min_order_by = {
  customer_id?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  payment_credit?: InputMaybe<order_by>
  payment_credit_account?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_currency?: InputMaybe<order_by>
  payment_date?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_account?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  payment_type?: InputMaybe<order_by>
  report_type?: InputMaybe<order_by>
}

/** response of any mutation on the table "payments" */
export type payments_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<payments>
}

/** input type for inserting object relation for remote table "payments" */
export type payments_obj_rel_insert_input = {
  data: payments_insert_input
  on_conflict?: InputMaybe<payments_on_conflict>
}

/** on conflict condition type for table "payments" */
export type payments_on_conflict = {
  constraint: payments_constraint
  update_columns: Array<payments_update_column>
  where?: InputMaybe<payments_bool_exp>
}

/** ordering options when selecting data from "payments" */
export type payments_order_by = {
  _customers?: InputMaybe<customers_order_by>
  _document_transactions?: InputMaybe<document_transactions_order_by>
  _goods_transactions_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _payments_payments_rel?: InputMaybe<payments_order_by>
  customer_id?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  is_payment_bookkept?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  payment_credit?: InputMaybe<order_by>
  payment_credit_account?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_currency?: InputMaybe<order_by>
  payment_date?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_account?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_document_transactions_rel?: InputMaybe<document_transactions_order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
  payment_type?: InputMaybe<order_by>
  payments_contra_account_rel_aggregate?: InputMaybe<payments_aggregate_order_by>
  payments_goods_transactions_rel_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  payments_payment_account_rel_aggregate?: InputMaybe<payments_aggregate_order_by>
  pyments_customers_rel?: InputMaybe<customers_order_by>
  report_type?: InputMaybe<order_by>
}

/** select columns of table "payments" */
export type payments_select_column =
  /** column name */
  | 'customer_id'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'is_payment_bookkept'
  /** column name */
  | 'our_company'
  /** column name */
  | 'payment_credit'
  /** column name */
  | 'payment_credit_account'
  /** column name */
  | 'payment_credit_in_exchange'
  /** column name */
  | 'payment_currency'
  /** column name */
  | 'payment_date'
  /** column name */
  | 'payment_debit'
  /** column name */
  | 'payment_debit_account'
  /** column name */
  | 'payment_debit_in_exchange'
  /** column name */
  | 'payment_exchange_difference'
  /** column name */
  | 'payment_exchange_rate'
  /** column name */
  | 'payment_id'
  /** column name */
  | 'payment_type'
  /** column name */
  | 'report_type'

/** input type for updating data in table "payments" */
export type payments_set_input = {
  customer_id?: InputMaybe<Scalars['String']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  is_payment_bookkept?: InputMaybe<Scalars['Boolean']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  payment_credit?: InputMaybe<Scalars['Int']['input']>
  payment_credit_account?: InputMaybe<Scalars['String']['input']>
  payment_credit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  payment_currency?: InputMaybe<Scalars['String']['input']>
  payment_date?: InputMaybe<Scalars['date']['input']>
  payment_debit?: InputMaybe<Scalars['Int']['input']>
  payment_debit_account?: InputMaybe<Scalars['String']['input']>
  payment_debit_in_exchange?: InputMaybe<Scalars['Int']['input']>
  payment_exchange_difference?: InputMaybe<Scalars['Int']['input']>
  payment_exchange_rate?: InputMaybe<Scalars['numeric']['input']>
  payment_id?: InputMaybe<Scalars['Int']['input']>
  payment_type?: InputMaybe<Scalars['String']['input']>
  report_type?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type payments_stddev_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "payments" */
export type payments_stddev_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type payments_stddev_pop_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "payments" */
export type payments_stddev_pop_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type payments_stddev_samp_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "payments" */
export type payments_stddev_samp_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type payments_sum_fields = {
  payment_credit?: Maybe<Scalars['Int']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_debit?: Maybe<Scalars['Int']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Int']['output']>
  payment_exchange_difference?: Maybe<Scalars['Int']['output']>
  payment_exchange_rate?: Maybe<Scalars['numeric']['output']>
  payment_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "payments" */
export type payments_sum_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** update columns of table "payments" */
export type payments_update_column =
  /** column name */
  | 'customer_id'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'is_payment_bookkept'
  /** column name */
  | 'our_company'
  /** column name */
  | 'payment_credit'
  /** column name */
  | 'payment_credit_account'
  /** column name */
  | 'payment_credit_in_exchange'
  /** column name */
  | 'payment_currency'
  /** column name */
  | 'payment_date'
  /** column name */
  | 'payment_debit'
  /** column name */
  | 'payment_debit_account'
  /** column name */
  | 'payment_debit_in_exchange'
  /** column name */
  | 'payment_exchange_difference'
  /** column name */
  | 'payment_exchange_rate'
  /** column name */
  | 'payment_id'
  /** column name */
  | 'payment_type'
  /** column name */
  | 'report_type'

/** aggregate var_pop on columns */
export type payments_var_pop_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "payments" */
export type payments_var_pop_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type payments_var_samp_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "payments" */
export type payments_var_samp_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type payments_variance_fields = {
  payment_credit?: Maybe<Scalars['Float']['output']>
  payment_credit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_debit?: Maybe<Scalars['Float']['output']>
  payment_debit_in_exchange?: Maybe<Scalars['Float']['output']>
  payment_exchange_difference?: Maybe<Scalars['Float']['output']>
  payment_exchange_rate?: Maybe<Scalars['Float']['output']>
  payment_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "payments" */
export type payments_variance_order_by = {
  payment_credit?: InputMaybe<order_by>
  payment_credit_in_exchange?: InputMaybe<order_by>
  payment_debit?: InputMaybe<order_by>
  payment_debit_in_exchange?: InputMaybe<order_by>
  payment_exchange_difference?: InputMaybe<order_by>
  payment_exchange_rate?: InputMaybe<order_by>
  payment_id?: InputMaybe<order_by>
}

/** query root */
export type query_root = {
  /** fetch data from the table: "__admin_pass" */
  __admin_pass: Array<__admin_pass>
  /** fetch aggregated fields from the table: "__admin_pass" */
  __admin_pass_aggregate: __admin_pass_aggregate
  /** fetch data from the table: "__admin_pass" using primary key columns */
  __admin_pass_by_pk?: Maybe<__admin_pass>
  /** fetch data from the table: "__privilege_pass" */
  __privilege_pass: Array<__privilege_pass>
  /** fetch aggregated fields from the table: "__privilege_pass" */
  __privilege_pass_aggregate: __privilege_pass_aggregate
  /** fetch data from the table: "__privilege_pass" using primary key columns */
  __privilege_pass_by_pk?: Maybe<__privilege_pass>
  /** fetch data from the table: "_our_companies_persistent_state" */
  _our_companies_persistent_state: Array<_our_companies_persistent_state>
  /** fetch aggregated fields from the table: "_our_companies_persistent_state" */
  _our_companies_persistent_state_aggregate: _our_companies_persistent_state_aggregate
  /** fetch data from the table: "_our_companies_persistent_state" using primary key columns */
  _our_companies_persistent_state_by_pk?: Maybe<_our_companies_persistent_state>
  /** fetch data from the table: "_type_account_plan" */
  _type_account_plan: Array<_type_account_plan>
  /** fetch aggregated fields from the table: "_type_account_plan" */
  _type_account_plan_aggregate: _type_account_plan_aggregate
  /** fetch data from the table: "_type_account_plan" using primary key columns */
  _type_account_plan_by_pk?: Maybe<_type_account_plan>
  /** fetch data from the table: "_type_moms_code" */
  _type_moms_code: Array<_type_moms_code>
  /** fetch aggregated fields from the table: "_type_moms_code" */
  _type_moms_code_aggregate: _type_moms_code_aggregate
  /** fetch data from the table: "_type_moms_code" using primary key columns */
  _type_moms_code_by_pk?: Maybe<_type_moms_code>
  /** fetch data from the table: "_type_stock_groups" */
  _type_stock_groups: Array<_type_stock_groups>
  /** fetch aggregated fields from the table: "_type_stock_groups" */
  _type_stock_groups_aggregate: _type_stock_groups_aggregate
  /** fetch data from the table: "_type_stock_groups" using primary key columns */
  _type_stock_groups_by_pk?: Maybe<_type_stock_groups>
  /** fetch data from the table: "_type_stock_unit" */
  _type_stock_unit: Array<_type_stock_unit>
  /** fetch aggregated fields from the table: "_type_stock_unit" */
  _type_stock_unit_aggregate: _type_stock_unit_aggregate
  /** fetch data from the table: "_type_stock_unit" using primary key columns */
  _type_stock_unit_by_pk?: Maybe<_type_stock_unit>
  /** fetch data from the table: "_ups_order_settings" */
  _ups_order_settings: Array<_ups_order_settings>
  /** fetch aggregated fields from the table: "_ups_order_settings" */
  _ups_order_settings_aggregate: _ups_order_settings_aggregate
  /** fetch data from the table: "_ups_order_settings" using primary key columns */
  _ups_order_settings_by_pk?: Maybe<_ups_order_settings>
  /** fetch data from the table: "_ups_report_settings" */
  _ups_report_settings: Array<_ups_report_settings>
  /** fetch aggregated fields from the table: "_ups_report_settings" */
  _ups_report_settings_aggregate: _ups_report_settings_aggregate
  /** fetch data from the table: "_ups_report_settings" using primary key columns */
  _ups_report_settings_by_pk?: Maybe<_ups_report_settings>
  /** fetch data from the table: "_user_persistent_state" */
  _user_persistent_state: Array<_user_persistent_state>
  /** fetch aggregated fields from the table: "_user_persistent_state" */
  _user_persistent_state_aggregate: _user_persistent_state_aggregate
  /** fetch data from the table: "_user_persistent_state" using primary key columns */
  _user_persistent_state_by_pk?: Maybe<_user_persistent_state>
  /** fetch data from the table: "addresses" */
  addresses: Array<addresses>
  /** fetch aggregated fields from the table: "addresses" */
  addresses_aggregate: addresses_aggregate
  /** fetch data from the table: "addresses" using primary key columns */
  addresses_by_pk?: Maybe<addresses>
  /** fetch data from the table: "addresses_cities" */
  addresses_cities: Array<addresses_cities>
  /** fetch aggregated fields from the table: "addresses_cities" */
  addresses_cities_aggregate: addresses_cities_aggregate
  /** fetch data from the table: "addresses_cities" using primary key columns */
  addresses_cities_by_pk?: Maybe<addresses_cities>
  /** fetch data from the table: "addresses_opening_times" */
  addresses_opening_times: Array<addresses_opening_times>
  /** fetch aggregated fields from the table: "addresses_opening_times" */
  addresses_opening_times_aggregate: addresses_opening_times_aggregate
  /** fetch data from the table: "addresses_opening_times" using primary key columns */
  addresses_opening_times_by_pk?: Maybe<addresses_opening_times>
  /** fetch data from the table: "adresses_routes" */
  adresses_routes: Array<adresses_routes>
  /** fetch aggregated fields from the table: "adresses_routes" */
  adresses_routes_aggregate: adresses_routes_aggregate
  /** fetch data from the table: "adresses_routes" using primary key columns */
  adresses_routes_by_pk?: Maybe<adresses_routes>
  /** fetch data from the table: "bank_accounts" */
  bank_accounts: Array<bank_accounts>
  /** fetch aggregated fields from the table: "bank_accounts" */
  bank_accounts_aggregate: bank_accounts_aggregate
  /** fetch data from the table: "bank_accounts" using primary key columns */
  bank_accounts_by_pk?: Maybe<bank_accounts>
  /** fetch data from the table: "book_keep_headers" */
  book_keep_headers: Array<book_keep_headers>
  /** fetch aggregated fields from the table: "book_keep_headers" */
  book_keep_headers_aggregate: book_keep_headers_aggregate
  /** fetch data from the table: "book_keep_headers" using primary key columns */
  book_keep_headers_by_pk?: Maybe<book_keep_headers>
  /** fetch data from the table: "book_keep_lines" */
  book_keep_lines: Array<book_keep_lines>
  /** fetch aggregated fields from the table: "book_keep_lines" */
  book_keep_lines_aggregate: book_keep_lines_aggregate
  /** fetch data from the table: "book_keep_lines" using primary key columns */
  book_keep_lines_by_pk?: Maybe<book_keep_lines>
  /** fetch data from the table: "collect_payment_report_headers" */
  collect_payment_report_headers: Array<collect_payment_report_headers>
  /** fetch aggregated fields from the table: "collect_payment_report_headers" */
  collect_payment_report_headers_aggregate: collect_payment_report_headers_aggregate
  /** fetch data from the table: "collect_payment_report_headers" using primary key columns */
  collect_payment_report_headers_by_pk?: Maybe<collect_payment_report_headers>
  /** fetch data from the table: "companies" */
  companies: Array<companies>
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: companies_aggregate
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk?: Maybe<companies>
  /** fetch data from the table: "customer_bookmarks" */
  customer_bookmarks: Array<customer_bookmarks>
  /** fetch aggregated fields from the table: "customer_bookmarks" */
  customer_bookmarks_aggregate: customer_bookmarks_aggregate
  /** fetch data from the table: "customer_bookmarks" using primary key columns */
  customer_bookmarks_by_pk?: Maybe<customer_bookmarks>
  /** fetch data from the table: "customer_price_list" */
  customer_price_list: Array<customer_price_list>
  /** fetch aggregated fields from the table: "customer_price_list" */
  customer_price_list_aggregate: customer_price_list_aggregate
  /** fetch data from the table: "customer_price_list" using primary key columns */
  customer_price_list_by_pk?: Maybe<customer_price_list>
  /** fetch data from the table: "customers" */
  customers: Array<customers>
  /** fetch aggregated fields from the table: "customers" */
  customers_aggregate: customers_aggregate
  /** fetch data from the table: "customers" using primary key columns */
  customers_by_pk?: Maybe<customers>
  /** fetch data from the table: "customers_visits" */
  customers_visits: Array<customers_visits>
  /** fetch aggregated fields from the table: "customers_visits" */
  customers_visits_aggregate: customers_visits_aggregate
  /** fetch data from the table: "customers_visits" using primary key columns */
  customers_visits_by_pk?: Maybe<customers_visits>
  /** fetch data from the table: "deliveries" */
  deliveries: Array<deliveries>
  /** fetch aggregated fields from the table: "deliveries" */
  deliveries_aggregate: deliveries_aggregate
  /** fetch data from the table: "deliveries" using primary key columns */
  deliveries_by_pk?: Maybe<deliveries>
  /** fetch data from the table: "deliveries_list_lines" */
  deliveries_list_lines: Array<deliveries_list_lines>
  /** fetch aggregated fields from the table: "deliveries_list_lines" */
  deliveries_list_lines_aggregate: deliveries_list_lines_aggregate
  /** fetch data from the table: "deliveries_list_lines" using primary key columns */
  deliveries_list_lines_by_pk?: Maybe<deliveries_list_lines>
  /** fetch data from the table: "dispatch_headers" */
  dispatch_headers: Array<dispatch_headers>
  /** fetch aggregated fields from the table: "dispatch_headers" */
  dispatch_headers_aggregate: dispatch_headers_aggregate
  /** fetch data from the table: "dispatch_headers" using primary key columns */
  dispatch_headers_by_pk?: Maybe<dispatch_headers>
  /** fetch data from the table: "document_transactions" */
  document_transactions: Array<document_transactions>
  /** fetch aggregated fields from the table: "document_transactions" */
  document_transactions_aggregate: document_transactions_aggregate
  /** fetch data from the table: "document_transactions" using primary key columns */
  document_transactions_by_pk?: Maybe<document_transactions>
  /** fetch data from the table: "drivers" */
  drivers: Array<drivers>
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: drivers_aggregate
  /** fetch data from the table: "drivers" using primary key columns */
  drivers_by_pk?: Maybe<drivers>
  /** fetch data from the table: "goods_transactions" */
  goods_transactions: Array<goods_transactions>
  /** fetch aggregated fields from the table: "goods_transactions" */
  goods_transactions_aggregate: goods_transactions_aggregate
  /** fetch data from the table: "goods_transactions" using primary key columns */
  goods_transactions_by_pk?: Maybe<goods_transactions>
  /** fetch data from the table: "invoice_book_keep_headers" */
  invoice_book_keep_headers: Array<invoice_book_keep_headers>
  /** fetch aggregated fields from the table: "invoice_book_keep_headers" */
  invoice_book_keep_headers_aggregate: invoice_book_keep_headers_aggregate
  /** fetch data from the table: "invoice_book_keep_headers" using primary key columns */
  invoice_book_keep_headers_by_pk?: Maybe<invoice_book_keep_headers>
  /** fetch data from the table: "invoice_book_keep_lines" */
  invoice_book_keep_lines: Array<invoice_book_keep_lines>
  /** fetch aggregated fields from the table: "invoice_book_keep_lines" */
  invoice_book_keep_lines_aggregate: invoice_book_keep_lines_aggregate
  /** fetch data from the table: "invoice_book_keep_lines" using primary key columns */
  invoice_book_keep_lines_by_pk?: Maybe<invoice_book_keep_lines>
  /** fetch data from the table: "invoice_journal_headers" */
  invoice_journal_headers: Array<invoice_journal_headers>
  /** fetch aggregated fields from the table: "invoice_journal_headers" */
  invoice_journal_headers_aggregate: invoice_journal_headers_aggregate
  /** fetch data from the table: "invoice_journal_headers" using primary key columns */
  invoice_journal_headers_by_pk?: Maybe<invoice_journal_headers>
  /** fetch data from the table: "order_headers" */
  order_headers: Array<order_headers>
  /** fetch aggregated fields from the table: "order_headers" */
  order_headers_aggregate: order_headers_aggregate
  /** fetch data from the table: "order_headers" using primary key columns */
  order_headers_by_pk?: Maybe<order_headers>
  /** fetch data from the table: "payments" */
  payments: Array<payments>
  /** fetch aggregated fields from the table: "payments" */
  payments_aggregate: payments_aggregate
  /** fetch data from the table: "payments" using primary key columns */
  payments_by_pk?: Maybe<payments>
  /** fetch data from the table: "reminder_headers" */
  reminder_headers: Array<reminder_headers>
  /** fetch aggregated fields from the table: "reminder_headers" */
  reminder_headers_aggregate: reminder_headers_aggregate
  /** fetch data from the table: "reminder_headers" using primary key columns */
  reminder_headers_by_pk?: Maybe<reminder_headers>
  /** fetch data from the table: "reminder_lines" */
  reminder_lines: Array<reminder_lines>
  /** fetch aggregated fields from the table: "reminder_lines" */
  reminder_lines_aggregate: reminder_lines_aggregate
  /** fetch data from the table: "reminder_lines" using primary key columns */
  reminder_lines_by_pk?: Maybe<reminder_lines>
  /** fetch data from the table: "route_names" */
  route_names: Array<route_names>
  /** fetch aggregated fields from the table: "route_names" */
  route_names_aggregate: route_names_aggregate
  /** fetch data from the table: "route_names" using primary key columns */
  route_names_by_pk?: Maybe<route_names>
  /** fetch data from the table: "stock" */
  stock: Array<stock>
  /** fetch aggregated fields from the table: "stock" */
  stock_aggregate: stock_aggregate
  /** fetch data from the table: "stock" using primary key columns */
  stock_by_pk?: Maybe<stock>
  /** fetch data from the table: "telephones" */
  telephones: Array<telephones>
  /** fetch aggregated fields from the table: "telephones" */
  telephones_aggregate: telephones_aggregate
  /** fetch data from the table: "telephones" using primary key columns */
  telephones_by_pk?: Maybe<telephones>
  /** fetch data from the table: "users" */
  users: Array<users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: users_aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<users>
  /** fetch data from the table: "vehicles" */
  vehicles: Array<vehicles>
  /** fetch aggregated fields from the table: "vehicles" */
  vehicles_aggregate: vehicles_aggregate
  /** fetch data from the table: "vehicles" using primary key columns */
  vehicles_by_pk?: Maybe<vehicles>
}

/** query root */
export type query_root__admin_passArgs = {
  distinct_on?: InputMaybe<Array<__admin_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__admin_pass_order_by>>
  where?: InputMaybe<__admin_pass_bool_exp>
}

/** query root */
export type query_root__admin_pass_aggregateArgs = {
  distinct_on?: InputMaybe<Array<__admin_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__admin_pass_order_by>>
  where?: InputMaybe<__admin_pass_bool_exp>
}

/** query root */
export type query_root__admin_pass_by_pkArgs = {
  admin_pass_id: Scalars['Int']['input']
}

/** query root */
export type query_root__privilege_passArgs = {
  distinct_on?: InputMaybe<Array<__privilege_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__privilege_pass_order_by>>
  where?: InputMaybe<__privilege_pass_bool_exp>
}

/** query root */
export type query_root__privilege_pass_aggregateArgs = {
  distinct_on?: InputMaybe<Array<__privilege_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__privilege_pass_order_by>>
  where?: InputMaybe<__privilege_pass_bool_exp>
}

/** query root */
export type query_root__privilege_pass_by_pkArgs = {
  privilege_id: Scalars['Int']['input']
}

/** query root */
export type query_root_our_companies_persistent_stateArgs = {
  distinct_on?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_our_companies_persistent_state_order_by>>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** query root */
export type query_root_our_companies_persistent_state_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_our_companies_persistent_state_order_by>>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** query root */
export type query_root_our_companies_persistent_state_by_pkArgs = {
  company_nickname: Scalars['String']['input']
}

/** query root */
export type query_root_type_account_planArgs = {
  distinct_on?: InputMaybe<Array<_type_account_plan_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_account_plan_order_by>>
  where?: InputMaybe<_type_account_plan_bool_exp>
}

/** query root */
export type query_root_type_account_plan_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_account_plan_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_account_plan_order_by>>
  where?: InputMaybe<_type_account_plan_bool_exp>
}

/** query root */
export type query_root_type_account_plan_by_pkArgs = {
  account_id_name: Scalars['String']['input']
}

/** query root */
export type query_root_type_moms_codeArgs = {
  distinct_on?: InputMaybe<Array<_type_moms_code_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_moms_code_order_by>>
  where?: InputMaybe<_type_moms_code_bool_exp>
}

/** query root */
export type query_root_type_moms_code_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_moms_code_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_moms_code_order_by>>
  where?: InputMaybe<_type_moms_code_bool_exp>
}

/** query root */
export type query_root_type_moms_code_by_pkArgs = {
  moms_id: Scalars['Int']['input']
}

/** query root */
export type query_root_type_stock_groupsArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_groups_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_groups_order_by>>
  where?: InputMaybe<_type_stock_groups_bool_exp>
}

/** query root */
export type query_root_type_stock_groups_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_groups_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_groups_order_by>>
  where?: InputMaybe<_type_stock_groups_bool_exp>
}

/** query root */
export type query_root_type_stock_groups_by_pkArgs = {
  our_company: Scalars['String']['input']
  stock_groups: Scalars['String']['input']
}

/** query root */
export type query_root_type_stock_unitArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_unit_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_unit_order_by>>
  where?: InputMaybe<_type_stock_unit_bool_exp>
}

/** query root */
export type query_root_type_stock_unit_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_unit_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_unit_order_by>>
  where?: InputMaybe<_type_stock_unit_bool_exp>
}

/** query root */
export type query_root_type_stock_unit_by_pkArgs = {
  stock_unit: Scalars['String']['input']
}

/** query root */
export type query_root_ups_order_settingsArgs = {
  distinct_on?: InputMaybe<Array<_ups_order_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_order_settings_order_by>>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** query root */
export type query_root_ups_order_settings_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_ups_order_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_order_settings_order_by>>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** query root */
export type query_root_ups_order_settings_by_pkArgs = {
  user_nickname: Scalars['String']['input']
}

/** query root */
export type query_root_ups_report_settingsArgs = {
  distinct_on?: InputMaybe<Array<_ups_report_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_report_settings_order_by>>
  where?: InputMaybe<_ups_report_settings_bool_exp>
}

/** query root */
export type query_root_ups_report_settings_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_ups_report_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_report_settings_order_by>>
  where?: InputMaybe<_ups_report_settings_bool_exp>
}

/** query root */
export type query_root_ups_report_settings_by_pkArgs = {
  _preset_name: Scalars['String']['input']
}

/** query root */
export type query_root_user_persistent_stateArgs = {
  distinct_on?: InputMaybe<Array<_user_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_user_persistent_state_order_by>>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** query root */
export type query_root_user_persistent_state_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_user_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_user_persistent_state_order_by>>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** query root */
export type query_root_user_persistent_state_by_pkArgs = {
  user_nickname: Scalars['String']['input']
}

/** query root */
export type query_rootaddressesArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** query root */
export type query_rootaddresses_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** query root */
export type query_rootaddresses_by_pkArgs = {
  address_id: Scalars['String']['input']
}

/** query root */
export type query_rootaddresses_citiesArgs = {
  distinct_on?: InputMaybe<Array<addresses_cities_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_cities_order_by>>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** query root */
export type query_rootaddresses_cities_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_cities_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_cities_order_by>>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** query root */
export type query_rootaddresses_cities_by_pkArgs = {
  city_name: Scalars['String']['input']
}

/** query root */
export type query_rootaddresses_opening_timesArgs = {
  distinct_on?: InputMaybe<Array<addresses_opening_times_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_opening_times_order_by>>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** query root */
export type query_rootaddresses_opening_times_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_opening_times_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_opening_times_order_by>>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** query root */
export type query_rootaddresses_opening_times_by_pkArgs = {
  address_id: Scalars['Int']['input']
  day_of_week: Scalars['Int']['input']
}

/** query root */
export type query_rootadresses_routesArgs = {
  distinct_on?: InputMaybe<Array<adresses_routes_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<adresses_routes_order_by>>
  where?: InputMaybe<adresses_routes_bool_exp>
}

/** query root */
export type query_rootadresses_routes_aggregateArgs = {
  distinct_on?: InputMaybe<Array<adresses_routes_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<adresses_routes_order_by>>
  where?: InputMaybe<adresses_routes_bool_exp>
}

/** query root */
export type query_rootadresses_routes_by_pkArgs = {
  route_id: Scalars['String']['input']
}

/** query root */
export type query_rootbank_accountsArgs = {
  distinct_on?: InputMaybe<Array<bank_accounts_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<bank_accounts_order_by>>
  where?: InputMaybe<bank_accounts_bool_exp>
}

/** query root */
export type query_rootbank_accounts_aggregateArgs = {
  distinct_on?: InputMaybe<Array<bank_accounts_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<bank_accounts_order_by>>
  where?: InputMaybe<bank_accounts_bool_exp>
}

/** query root */
export type query_rootbank_accounts_by_pkArgs = {
  bank_account_id: Scalars['uuid']['input']
}

/** query root */
export type query_rootbook_keep_headersArgs = {
  distinct_on?: InputMaybe<Array<book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_headers_order_by>>
  where?: InputMaybe<book_keep_headers_bool_exp>
}

/** query root */
export type query_rootbook_keep_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_headers_order_by>>
  where?: InputMaybe<book_keep_headers_bool_exp>
}

/** query root */
export type query_rootbook_keep_headers_by_pkArgs = {
  book_keep_id: Scalars['String']['input']
}

/** query root */
export type query_rootbook_keep_linesArgs = {
  distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_lines_order_by>>
  where?: InputMaybe<book_keep_lines_bool_exp>
}

/** query root */
export type query_rootbook_keep_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_lines_order_by>>
  where?: InputMaybe<book_keep_lines_bool_exp>
}

/** query root */
export type query_rootbook_keep_lines_by_pkArgs = {
  line_id: Scalars['Int']['input']
}

/** query root */
export type query_rootcollect_payment_report_headersArgs = {
  distinct_on?: InputMaybe<Array<collect_payment_report_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<collect_payment_report_headers_order_by>>
  where?: InputMaybe<collect_payment_report_headers_bool_exp>
}

/** query root */
export type query_rootcollect_payment_report_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<collect_payment_report_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<collect_payment_report_headers_order_by>>
  where?: InputMaybe<collect_payment_report_headers_bool_exp>
}

/** query root */
export type query_rootcollect_payment_report_headers_by_pkArgs = {
  report_number: Scalars['Int']['input']
  report_type: Scalars['String']['input']
}

/** query root */
export type query_rootcompaniesArgs = {
  distinct_on?: InputMaybe<Array<companies_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<companies_order_by>>
  where?: InputMaybe<companies_bool_exp>
}

/** query root */
export type query_rootcompanies_aggregateArgs = {
  distinct_on?: InputMaybe<Array<companies_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<companies_order_by>>
  where?: InputMaybe<companies_bool_exp>
}

/** query root */
export type query_rootcompanies_by_pkArgs = {
  company_nickname: Scalars['String']['input']
}

/** query root */
export type query_rootcustomer_bookmarksArgs = {
  distinct_on?: InputMaybe<Array<customer_bookmarks_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_bookmarks_order_by>>
  where?: InputMaybe<customer_bookmarks_bool_exp>
}

/** query root */
export type query_rootcustomer_bookmarks_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_bookmarks_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_bookmarks_order_by>>
  where?: InputMaybe<customer_bookmarks_bool_exp>
}

/** query root */
export type query_rootcustomer_bookmarks_by_pkArgs = {
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}

/** query root */
export type query_rootcustomer_price_listArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** query root */
export type query_rootcustomer_price_list_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** query root */
export type query_rootcustomer_price_list_by_pkArgs = {
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}

/** query root */
export type query_rootcustomersArgs = {
  distinct_on?: InputMaybe<Array<customers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_order_by>>
  where?: InputMaybe<customers_bool_exp>
}

/** query root */
export type query_rootcustomers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_order_by>>
  where?: InputMaybe<customers_bool_exp>
}

/** query root */
export type query_rootcustomers_by_pkArgs = {
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
}

/** query root */
export type query_rootcustomers_visitsArgs = {
  distinct_on?: InputMaybe<Array<customers_visits_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_visits_order_by>>
  where?: InputMaybe<customers_visits_bool_exp>
}

/** query root */
export type query_rootcustomers_visits_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customers_visits_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_visits_order_by>>
  where?: InputMaybe<customers_visits_bool_exp>
}

/** query root */
export type query_rootcustomers_visits_by_pkArgs = {
  visit_id: Scalars['Int']['input']
}

/** query root */
export type query_rootdeliveriesArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** query root */
export type query_rootdeliveries_aggregateArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** query root */
export type query_rootdeliveries_by_pkArgs = {
  delivery_id: Scalars['Int']['input']
}

/** query root */
export type query_rootdeliveries_list_linesArgs = {
  distinct_on?: InputMaybe<Array<deliveries_list_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_list_lines_order_by>>
  where?: InputMaybe<deliveries_list_lines_bool_exp>
}

/** query root */
export type query_rootdeliveries_list_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<deliveries_list_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_list_lines_order_by>>
  where?: InputMaybe<deliveries_list_lines_bool_exp>
}

/** query root */
export type query_rootdeliveries_list_lines_by_pkArgs = {
  dispatch_id: Scalars['String']['input']
}

/** query root */
export type query_rootdispatch_headersArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** query root */
export type query_rootdispatch_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** query root */
export type query_rootdispatch_headers_by_pkArgs = {
  dispatch_number: Scalars['String']['input']
}

/** query root */
export type query_rootdocument_transactionsArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** query root */
export type query_rootdocument_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** query root */
export type query_rootdocument_transactions_by_pkArgs = {
  document_transaction_id: Scalars['String']['input']
}

/** query root */
export type query_rootdriversArgs = {
  distinct_on?: InputMaybe<Array<drivers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<drivers_order_by>>
  where?: InputMaybe<drivers_bool_exp>
}

/** query root */
export type query_rootdrivers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<drivers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<drivers_order_by>>
  where?: InputMaybe<drivers_bool_exp>
}

/** query root */
export type query_rootdrivers_by_pkArgs = {
  driver_id: Scalars['Int']['input']
}

/** query root */
export type query_rootgoods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** query root */
export type query_rootgoods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** query root */
export type query_rootgoods_transactions_by_pkArgs = {
  goods_transaction_id: Scalars['uuid']['input']
}

/** query root */
export type query_rootinvoice_book_keep_headersArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_headers_order_by>>
  where?: InputMaybe<invoice_book_keep_headers_bool_exp>
}

/** query root */
export type query_rootinvoice_book_keep_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_headers_order_by>>
  where?: InputMaybe<invoice_book_keep_headers_bool_exp>
}

/** query root */
export type query_rootinvoice_book_keep_headers_by_pkArgs = {
  book_keep_id: Scalars['Int']['input']
}

/** query root */
export type query_rootinvoice_book_keep_linesArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** query root */
export type query_rootinvoice_book_keep_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** query root */
export type query_rootinvoice_book_keep_lines_by_pkArgs = {
  line_id: Scalars['Int']['input']
}

/** query root */
export type query_rootinvoice_journal_headersArgs = {
  distinct_on?: InputMaybe<Array<invoice_journal_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_journal_headers_order_by>>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** query root */
export type query_rootinvoice_journal_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_journal_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_journal_headers_order_by>>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** query root */
export type query_rootinvoice_journal_headers_by_pkArgs = {
  report_number: Scalars['Int']['input']
}

/** query root */
export type query_rootorder_headersArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** query root */
export type query_rootorder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** query root */
export type query_rootorder_headers_by_pkArgs = {
  order_number: Scalars['String']['input']
}

/** query root */
export type query_rootpaymentsArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** query root */
export type query_rootpayments_aggregateArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** query root */
export type query_rootpayments_by_pkArgs = {
  payment_id: Scalars['Int']['input']
}

/** query root */
export type query_rootreminder_headersArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** query root */
export type query_rootreminder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** query root */
export type query_rootreminder_headers_by_pkArgs = {
  reminder_id: Scalars['String']['input']
}

/** query root */
export type query_rootreminder_linesArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** query root */
export type query_rootreminder_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** query root */
export type query_rootreminder_lines_by_pkArgs = {
  line_id: Scalars['Int']['input']
}

/** query root */
export type query_rootroute_namesArgs = {
  distinct_on?: InputMaybe<Array<route_names_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<route_names_order_by>>
  where?: InputMaybe<route_names_bool_exp>
}

/** query root */
export type query_rootroute_names_aggregateArgs = {
  distinct_on?: InputMaybe<Array<route_names_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<route_names_order_by>>
  where?: InputMaybe<route_names_bool_exp>
}

/** query root */
export type query_rootroute_names_by_pkArgs = {
  route_id: Scalars['String']['input']
}

/** query root */
export type query_rootstockArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** query root */
export type query_rootstock_aggregateArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** query root */
export type query_rootstock_by_pkArgs = {
  company_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}

/** query root */
export type query_roottelephonesArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** query root */
export type query_roottelephones_aggregateArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** query root */
export type query_roottelephones_by_pkArgs = {
  company_id: Scalars['String']['input']
  owner_id: Scalars['String']['input']
  telephone_number: Scalars['String']['input']
}

/** query root */
export type query_rootusersArgs = {
  distinct_on?: InputMaybe<Array<users_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<users_order_by>>
  where?: InputMaybe<users_bool_exp>
}

/** query root */
export type query_rootusers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<users_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<users_order_by>>
  where?: InputMaybe<users_bool_exp>
}

/** query root */
export type query_rootusers_by_pkArgs = {
  id: Scalars['String']['input']
}

/** query root */
export type query_rootvehiclesArgs = {
  distinct_on?: InputMaybe<Array<vehicles_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<vehicles_order_by>>
  where?: InputMaybe<vehicles_bool_exp>
}

/** query root */
export type query_rootvehicles_aggregateArgs = {
  distinct_on?: InputMaybe<Array<vehicles_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<vehicles_order_by>>
  where?: InputMaybe<vehicles_bool_exp>
}

/** query root */
export type query_rootvehicles_by_pkArgs = {
  vehicle_id: Scalars['String']['input']
}

/** columns and relationships of "reminder_headers" */
export type reminder_headers = {
  /** An object relationship */
  _customer?: Maybe<customers>
  company_nickname: Scalars['String']['output']
  customer_id: Scalars['String']['output']
  is_reminder_fee_paid: Scalars['Boolean']['output']
  is_reminder_sent: Scalars['Boolean']['output']
  is_sent_in_the_bailiffs: Scalars['Boolean']['output']
  reminder_address_id: Scalars['String']['output']
  reminder_date: Scalars['date']['output']
  reminder_due_date?: Maybe<Scalars['date']['output']>
  reminder_fee: Scalars['Int']['output']
  /** An object relationship */
  reminder_header_customer_rel: customers
  /** An object relationship */
  reminder_headers_addresses_rel?: Maybe<addresses>
  /** An object relationship */
  reminder_headers_company_rel: companies
  /** An array relationship */
  reminder_headers_reminder_headers_customer_id_rel: Array<reminder_headers>
  /** An aggregated array relationship */
  reminder_headers_reminder_headers_customer_id_rel_aggregate: reminder_headers_aggregate
  /** An array relationship */
  reminder_headers_reminder_lines_our_company_customr_id_rel: Array<reminder_lines>
  /** An aggregated array relationship */
  reminder_headers_reminder_lines_our_company_customr_id_rel_aggregate: reminder_lines_aggregate
  /** An array relationship */
  reminder_headers_reminder_lines_rel: Array<reminder_lines>
  /** An aggregated array relationship */
  reminder_headers_reminder_lines_rel_aggregate: reminder_lines_aggregate
  reminder_id: Scalars['String']['output']
}

/** columns and relationships of "reminder_headers" */
export type reminder_headersreminder_headers_reminder_headers_customer_id_relArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_headers_order_by>>
    where?: InputMaybe<reminder_headers_bool_exp>
  }

/** columns and relationships of "reminder_headers" */
export type reminder_headersreminder_headers_reminder_headers_customer_id_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_headers_order_by>>
    where?: InputMaybe<reminder_headers_bool_exp>
  }

/** columns and relationships of "reminder_headers" */
export type reminder_headersreminder_headers_reminder_lines_our_company_customr_id_relArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_lines_order_by>>
    where?: InputMaybe<reminder_lines_bool_exp>
  }

/** columns and relationships of "reminder_headers" */
export type reminder_headersreminder_headers_reminder_lines_our_company_customr_id_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_lines_order_by>>
    where?: InputMaybe<reminder_lines_bool_exp>
  }

/** columns and relationships of "reminder_headers" */
export type reminder_headersreminder_headers_reminder_lines_relArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** columns and relationships of "reminder_headers" */
export type reminder_headersreminder_headers_reminder_lines_rel_aggregateArgs =
  {
    distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
    limit?: InputMaybe<Scalars['Int']['input']>
    offset?: InputMaybe<Scalars['Int']['input']>
    order_by?: InputMaybe<Array<reminder_lines_order_by>>
    where?: InputMaybe<reminder_lines_bool_exp>
  }

/** aggregated selection of "reminder_headers" */
export type reminder_headers_aggregate = {
  aggregate?: Maybe<reminder_headers_aggregate_fields>
  nodes: Array<reminder_headers>
}

/** aggregate fields of "reminder_headers" */
export type reminder_headers_aggregate_fields = {
  avg?: Maybe<reminder_headers_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<reminder_headers_max_fields>
  min?: Maybe<reminder_headers_min_fields>
  stddev?: Maybe<reminder_headers_stddev_fields>
  stddev_pop?: Maybe<reminder_headers_stddev_pop_fields>
  stddev_samp?: Maybe<reminder_headers_stddev_samp_fields>
  sum?: Maybe<reminder_headers_sum_fields>
  var_pop?: Maybe<reminder_headers_var_pop_fields>
  var_samp?: Maybe<reminder_headers_var_samp_fields>
  variance?: Maybe<reminder_headers_variance_fields>
}

/** aggregate fields of "reminder_headers" */
export type reminder_headers_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<reminder_headers_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "reminder_headers" */
export type reminder_headers_aggregate_order_by = {
  avg?: InputMaybe<reminder_headers_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<reminder_headers_max_order_by>
  min?: InputMaybe<reminder_headers_min_order_by>
  stddev?: InputMaybe<reminder_headers_stddev_order_by>
  stddev_pop?: InputMaybe<reminder_headers_stddev_pop_order_by>
  stddev_samp?: InputMaybe<reminder_headers_stddev_samp_order_by>
  sum?: InputMaybe<reminder_headers_sum_order_by>
  var_pop?: InputMaybe<reminder_headers_var_pop_order_by>
  var_samp?: InputMaybe<reminder_headers_var_samp_order_by>
  variance?: InputMaybe<reminder_headers_variance_order_by>
}

/** input type for inserting array relation for remote table "reminder_headers" */
export type reminder_headers_arr_rel_insert_input = {
  data: Array<reminder_headers_insert_input>
  on_conflict?: InputMaybe<reminder_headers_on_conflict>
}

/** aggregate avg on columns */
export type reminder_headers_avg_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "reminder_headers" */
export type reminder_headers_avg_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "reminder_headers". All fields are combined with a logical 'AND'. */
export type reminder_headers_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<reminder_headers_bool_exp>>>
  _customer?: InputMaybe<customers_bool_exp>
  _not?: InputMaybe<reminder_headers_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<reminder_headers_bool_exp>>>
  company_nickname?: InputMaybe<String_comparison_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  is_reminder_fee_paid?: InputMaybe<Boolean_comparison_exp>
  is_reminder_sent?: InputMaybe<Boolean_comparison_exp>
  is_sent_in_the_bailiffs?: InputMaybe<Boolean_comparison_exp>
  reminder_address_id?: InputMaybe<String_comparison_exp>
  reminder_date?: InputMaybe<date_comparison_exp>
  reminder_due_date?: InputMaybe<date_comparison_exp>
  reminder_fee?: InputMaybe<Int_comparison_exp>
  reminder_header_customer_rel?: InputMaybe<customers_bool_exp>
  reminder_headers_addresses_rel?: InputMaybe<addresses_bool_exp>
  reminder_headers_company_rel?: InputMaybe<companies_bool_exp>
  reminder_headers_reminder_headers_customer_id_rel?: InputMaybe<reminder_headers_bool_exp>
  reminder_headers_reminder_lines_our_company_customr_id_rel?: InputMaybe<reminder_lines_bool_exp>
  reminder_headers_reminder_lines_rel?: InputMaybe<reminder_lines_bool_exp>
  reminder_id?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "reminder_headers" */
export type reminder_headers_constraint =
  /** unique or primary key constraint */
  | 'reminder_headers_pkey'
  /** unique or primary key constraint */
  | 'reminder_headers_reminder_number_key'

/** input type for incrementing integer columne in table "reminder_headers" */
export type reminder_headers_inc_input = {
  reminder_fee?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "reminder_headers" */
export type reminder_headers_insert_input = {
  _customer?: InputMaybe<customers_obj_rel_insert_input>
  company_nickname?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  is_reminder_fee_paid?: InputMaybe<Scalars['Boolean']['input']>
  is_reminder_sent?: InputMaybe<Scalars['Boolean']['input']>
  is_sent_in_the_bailiffs?: InputMaybe<Scalars['Boolean']['input']>
  reminder_address_id?: InputMaybe<Scalars['String']['input']>
  reminder_date?: InputMaybe<Scalars['date']['input']>
  reminder_due_date?: InputMaybe<Scalars['date']['input']>
  reminder_fee?: InputMaybe<Scalars['Int']['input']>
  reminder_header_customer_rel?: InputMaybe<customers_obj_rel_insert_input>
  reminder_headers_addresses_rel?: InputMaybe<addresses_obj_rel_insert_input>
  reminder_headers_company_rel?: InputMaybe<companies_obj_rel_insert_input>
  reminder_headers_reminder_headers_customer_id_rel?: InputMaybe<reminder_headers_arr_rel_insert_input>
  reminder_headers_reminder_lines_our_company_customr_id_rel?: InputMaybe<reminder_lines_arr_rel_insert_input>
  reminder_headers_reminder_lines_rel?: InputMaybe<reminder_lines_arr_rel_insert_input>
  reminder_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type reminder_headers_max_fields = {
  company_nickname?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  reminder_address_id?: Maybe<Scalars['String']['output']>
  reminder_date?: Maybe<Scalars['date']['output']>
  reminder_due_date?: Maybe<Scalars['date']['output']>
  reminder_fee?: Maybe<Scalars['Int']['output']>
  reminder_id?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "reminder_headers" */
export type reminder_headers_max_order_by = {
  company_nickname?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  reminder_address_id?: InputMaybe<order_by>
  reminder_date?: InputMaybe<order_by>
  reminder_due_date?: InputMaybe<order_by>
  reminder_fee?: InputMaybe<order_by>
  reminder_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type reminder_headers_min_fields = {
  company_nickname?: Maybe<Scalars['String']['output']>
  customer_id?: Maybe<Scalars['String']['output']>
  reminder_address_id?: Maybe<Scalars['String']['output']>
  reminder_date?: Maybe<Scalars['date']['output']>
  reminder_due_date?: Maybe<Scalars['date']['output']>
  reminder_fee?: Maybe<Scalars['Int']['output']>
  reminder_id?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "reminder_headers" */
export type reminder_headers_min_order_by = {
  company_nickname?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  reminder_address_id?: InputMaybe<order_by>
  reminder_date?: InputMaybe<order_by>
  reminder_due_date?: InputMaybe<order_by>
  reminder_fee?: InputMaybe<order_by>
  reminder_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "reminder_headers" */
export type reminder_headers_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<reminder_headers>
}

/** input type for inserting object relation for remote table "reminder_headers" */
export type reminder_headers_obj_rel_insert_input = {
  data: reminder_headers_insert_input
  on_conflict?: InputMaybe<reminder_headers_on_conflict>
}

/** on conflict condition type for table "reminder_headers" */
export type reminder_headers_on_conflict = {
  constraint: reminder_headers_constraint
  update_columns: Array<reminder_headers_update_column>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** ordering options when selecting data from "reminder_headers" */
export type reminder_headers_order_by = {
  _customer?: InputMaybe<customers_order_by>
  company_nickname?: InputMaybe<order_by>
  customer_id?: InputMaybe<order_by>
  is_reminder_fee_paid?: InputMaybe<order_by>
  is_reminder_sent?: InputMaybe<order_by>
  is_sent_in_the_bailiffs?: InputMaybe<order_by>
  reminder_address_id?: InputMaybe<order_by>
  reminder_date?: InputMaybe<order_by>
  reminder_due_date?: InputMaybe<order_by>
  reminder_fee?: InputMaybe<order_by>
  reminder_header_customer_rel?: InputMaybe<customers_order_by>
  reminder_headers_addresses_rel?: InputMaybe<addresses_order_by>
  reminder_headers_company_rel?: InputMaybe<companies_order_by>
  reminder_headers_reminder_headers_customer_id_rel_aggregate?: InputMaybe<reminder_headers_aggregate_order_by>
  reminder_headers_reminder_lines_our_company_customr_id_rel_aggregate?: InputMaybe<reminder_lines_aggregate_order_by>
  reminder_headers_reminder_lines_rel_aggregate?: InputMaybe<reminder_lines_aggregate_order_by>
  reminder_id?: InputMaybe<order_by>
}

/** select columns of table "reminder_headers" */
export type reminder_headers_select_column =
  /** column name */
  | 'company_nickname'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'is_reminder_fee_paid'
  /** column name */
  | 'is_reminder_sent'
  /** column name */
  | 'is_sent_in_the_bailiffs'
  /** column name */
  | 'reminder_address_id'
  /** column name */
  | 'reminder_date'
  /** column name */
  | 'reminder_due_date'
  /** column name */
  | 'reminder_fee'
  /** column name */
  | 'reminder_id'

/** input type for updating data in table "reminder_headers" */
export type reminder_headers_set_input = {
  company_nickname?: InputMaybe<Scalars['String']['input']>
  customer_id?: InputMaybe<Scalars['String']['input']>
  is_reminder_fee_paid?: InputMaybe<Scalars['Boolean']['input']>
  is_reminder_sent?: InputMaybe<Scalars['Boolean']['input']>
  is_sent_in_the_bailiffs?: InputMaybe<Scalars['Boolean']['input']>
  reminder_address_id?: InputMaybe<Scalars['String']['input']>
  reminder_date?: InputMaybe<Scalars['date']['input']>
  reminder_due_date?: InputMaybe<Scalars['date']['input']>
  reminder_fee?: InputMaybe<Scalars['Int']['input']>
  reminder_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type reminder_headers_stddev_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "reminder_headers" */
export type reminder_headers_stddev_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type reminder_headers_stddev_pop_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "reminder_headers" */
export type reminder_headers_stddev_pop_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type reminder_headers_stddev_samp_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "reminder_headers" */
export type reminder_headers_stddev_samp_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type reminder_headers_sum_fields = {
  reminder_fee?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "reminder_headers" */
export type reminder_headers_sum_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** update columns of table "reminder_headers" */
export type reminder_headers_update_column =
  /** column name */
  | 'company_nickname'
  /** column name */
  | 'customer_id'
  /** column name */
  | 'is_reminder_fee_paid'
  /** column name */
  | 'is_reminder_sent'
  /** column name */
  | 'is_sent_in_the_bailiffs'
  /** column name */
  | 'reminder_address_id'
  /** column name */
  | 'reminder_date'
  /** column name */
  | 'reminder_due_date'
  /** column name */
  | 'reminder_fee'
  /** column name */
  | 'reminder_id'

/** aggregate var_pop on columns */
export type reminder_headers_var_pop_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "reminder_headers" */
export type reminder_headers_var_pop_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type reminder_headers_var_samp_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "reminder_headers" */
export type reminder_headers_var_samp_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type reminder_headers_variance_fields = {
  reminder_fee?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "reminder_headers" */
export type reminder_headers_variance_order_by = {
  reminder_fee?: InputMaybe<order_by>
}

/** columns and relationships of "reminder_lines" */
export type reminder_lines = {
  /** An object relationship */
  _reminder_headers?: Maybe<reminder_headers>
  customer_id: Scalars['String']['output']
  invoice_balance: Scalars['Int']['output']
  invoice_date: Scalars['date']['output']
  invoice_due_date: Scalars['date']['output']
  invoice_number: Scalars['String']['output']
  invoice_payment: Scalars['Int']['output']
  invoice_to_pay: Scalars['Int']['output']
  line_id: Scalars['Int']['output']
  our_company: Scalars['String']['output']
  /** An object relationship */
  reminder_header?: Maybe<reminder_headers>
  reminder_id?: Maybe<Scalars['String']['output']>
  /** An object relationship */
  reminder_lines_customer_rel?: Maybe<customers>
  /** An object relationship */
  reminder_lines_document_transactions_rel?: Maybe<document_transactions>
  /** An object relationship */
  reminder_transaction_rel?: Maybe<document_transactions>
}

/** aggregated selection of "reminder_lines" */
export type reminder_lines_aggregate = {
  aggregate?: Maybe<reminder_lines_aggregate_fields>
  nodes: Array<reminder_lines>
}

/** aggregate fields of "reminder_lines" */
export type reminder_lines_aggregate_fields = {
  avg?: Maybe<reminder_lines_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<reminder_lines_max_fields>
  min?: Maybe<reminder_lines_min_fields>
  stddev?: Maybe<reminder_lines_stddev_fields>
  stddev_pop?: Maybe<reminder_lines_stddev_pop_fields>
  stddev_samp?: Maybe<reminder_lines_stddev_samp_fields>
  sum?: Maybe<reminder_lines_sum_fields>
  var_pop?: Maybe<reminder_lines_var_pop_fields>
  var_samp?: Maybe<reminder_lines_var_samp_fields>
  variance?: Maybe<reminder_lines_variance_fields>
}

/** aggregate fields of "reminder_lines" */
export type reminder_lines_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<reminder_lines_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "reminder_lines" */
export type reminder_lines_aggregate_order_by = {
  avg?: InputMaybe<reminder_lines_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<reminder_lines_max_order_by>
  min?: InputMaybe<reminder_lines_min_order_by>
  stddev?: InputMaybe<reminder_lines_stddev_order_by>
  stddev_pop?: InputMaybe<reminder_lines_stddev_pop_order_by>
  stddev_samp?: InputMaybe<reminder_lines_stddev_samp_order_by>
  sum?: InputMaybe<reminder_lines_sum_order_by>
  var_pop?: InputMaybe<reminder_lines_var_pop_order_by>
  var_samp?: InputMaybe<reminder_lines_var_samp_order_by>
  variance?: InputMaybe<reminder_lines_variance_order_by>
}

/** input type for inserting array relation for remote table "reminder_lines" */
export type reminder_lines_arr_rel_insert_input = {
  data: Array<reminder_lines_insert_input>
  on_conflict?: InputMaybe<reminder_lines_on_conflict>
}

/** aggregate avg on columns */
export type reminder_lines_avg_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "reminder_lines" */
export type reminder_lines_avg_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "reminder_lines". All fields are combined with a logical 'AND'. */
export type reminder_lines_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<reminder_lines_bool_exp>>>
  _not?: InputMaybe<reminder_lines_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<reminder_lines_bool_exp>>>
  _reminder_headers?: InputMaybe<reminder_headers_bool_exp>
  customer_id?: InputMaybe<String_comparison_exp>
  invoice_balance?: InputMaybe<Int_comparison_exp>
  invoice_date?: InputMaybe<date_comparison_exp>
  invoice_due_date?: InputMaybe<date_comparison_exp>
  invoice_number?: InputMaybe<String_comparison_exp>
  invoice_payment?: InputMaybe<Int_comparison_exp>
  invoice_to_pay?: InputMaybe<Int_comparison_exp>
  line_id?: InputMaybe<Int_comparison_exp>
  our_company?: InputMaybe<String_comparison_exp>
  reminder_header?: InputMaybe<reminder_headers_bool_exp>
  reminder_id?: InputMaybe<String_comparison_exp>
  reminder_lines_customer_rel?: InputMaybe<customers_bool_exp>
  reminder_lines_document_transactions_rel?: InputMaybe<document_transactions_bool_exp>
  reminder_transaction_rel?: InputMaybe<document_transactions_bool_exp>
}

/** unique or primary key constraints on table "reminder_lines" */
export type reminder_lines_constraint =
  /** unique or primary key constraint */
  | 'reminder_lines_invoice_number_key'
  /** unique or primary key constraint */
  | 'reminder_lines_pkey'

/** input type for incrementing integer columne in table "reminder_lines" */
export type reminder_lines_inc_input = {
  invoice_balance?: InputMaybe<Scalars['Int']['input']>
  invoice_payment?: InputMaybe<Scalars['Int']['input']>
  invoice_to_pay?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "reminder_lines" */
export type reminder_lines_insert_input = {
  _reminder_headers?: InputMaybe<reminder_headers_obj_rel_insert_input>
  customer_id?: InputMaybe<Scalars['String']['input']>
  invoice_balance?: InputMaybe<Scalars['Int']['input']>
  invoice_date?: InputMaybe<Scalars['date']['input']>
  invoice_due_date?: InputMaybe<Scalars['date']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  invoice_payment?: InputMaybe<Scalars['Int']['input']>
  invoice_to_pay?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  reminder_header?: InputMaybe<reminder_headers_obj_rel_insert_input>
  reminder_id?: InputMaybe<Scalars['String']['input']>
  reminder_lines_customer_rel?: InputMaybe<customers_obj_rel_insert_input>
  reminder_lines_document_transactions_rel?: InputMaybe<document_transactions_obj_rel_insert_input>
  reminder_transaction_rel?: InputMaybe<document_transactions_obj_rel_insert_input>
}

/** aggregate max on columns */
export type reminder_lines_max_fields = {
  customer_id?: Maybe<Scalars['String']['output']>
  invoice_balance?: Maybe<Scalars['Int']['output']>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_payment?: Maybe<Scalars['Int']['output']>
  invoice_to_pay?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  reminder_id?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "reminder_lines" */
export type reminder_lines_max_order_by = {
  customer_id?: InputMaybe<order_by>
  invoice_balance?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  reminder_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type reminder_lines_min_fields = {
  customer_id?: Maybe<Scalars['String']['output']>
  invoice_balance?: Maybe<Scalars['Int']['output']>
  invoice_date?: Maybe<Scalars['date']['output']>
  invoice_due_date?: Maybe<Scalars['date']['output']>
  invoice_number?: Maybe<Scalars['String']['output']>
  invoice_payment?: Maybe<Scalars['Int']['output']>
  invoice_to_pay?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
  our_company?: Maybe<Scalars['String']['output']>
  reminder_id?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "reminder_lines" */
export type reminder_lines_min_order_by = {
  customer_id?: InputMaybe<order_by>
  invoice_balance?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  reminder_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "reminder_lines" */
export type reminder_lines_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<reminder_lines>
}

/** input type for inserting object relation for remote table "reminder_lines" */
export type reminder_lines_obj_rel_insert_input = {
  data: reminder_lines_insert_input
  on_conflict?: InputMaybe<reminder_lines_on_conflict>
}

/** on conflict condition type for table "reminder_lines" */
export type reminder_lines_on_conflict = {
  constraint: reminder_lines_constraint
  update_columns: Array<reminder_lines_update_column>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** ordering options when selecting data from "reminder_lines" */
export type reminder_lines_order_by = {
  _reminder_headers?: InputMaybe<reminder_headers_order_by>
  customer_id?: InputMaybe<order_by>
  invoice_balance?: InputMaybe<order_by>
  invoice_date?: InputMaybe<order_by>
  invoice_due_date?: InputMaybe<order_by>
  invoice_number?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
  our_company?: InputMaybe<order_by>
  reminder_header?: InputMaybe<reminder_headers_order_by>
  reminder_id?: InputMaybe<order_by>
  reminder_lines_customer_rel?: InputMaybe<customers_order_by>
  reminder_lines_document_transactions_rel?: InputMaybe<document_transactions_order_by>
  reminder_transaction_rel?: InputMaybe<document_transactions_order_by>
}

/** select columns of table "reminder_lines" */
export type reminder_lines_select_column =
  /** column name */
  | 'customer_id'
  /** column name */
  | 'invoice_balance'
  /** column name */
  | 'invoice_date'
  /** column name */
  | 'invoice_due_date'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'invoice_payment'
  /** column name */
  | 'invoice_to_pay'
  /** column name */
  | 'line_id'
  /** column name */
  | 'our_company'
  /** column name */
  | 'reminder_id'

/** input type for updating data in table "reminder_lines" */
export type reminder_lines_set_input = {
  customer_id?: InputMaybe<Scalars['String']['input']>
  invoice_balance?: InputMaybe<Scalars['Int']['input']>
  invoice_date?: InputMaybe<Scalars['date']['input']>
  invoice_due_date?: InputMaybe<Scalars['date']['input']>
  invoice_number?: InputMaybe<Scalars['String']['input']>
  invoice_payment?: InputMaybe<Scalars['Int']['input']>
  invoice_to_pay?: InputMaybe<Scalars['Int']['input']>
  line_id?: InputMaybe<Scalars['Int']['input']>
  our_company?: InputMaybe<Scalars['String']['input']>
  reminder_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type reminder_lines_stddev_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "reminder_lines" */
export type reminder_lines_stddev_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type reminder_lines_stddev_pop_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "reminder_lines" */
export type reminder_lines_stddev_pop_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type reminder_lines_stddev_samp_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "reminder_lines" */
export type reminder_lines_stddev_samp_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type reminder_lines_sum_fields = {
  invoice_balance?: Maybe<Scalars['Int']['output']>
  invoice_payment?: Maybe<Scalars['Int']['output']>
  invoice_to_pay?: Maybe<Scalars['Int']['output']>
  line_id?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "reminder_lines" */
export type reminder_lines_sum_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** update columns of table "reminder_lines" */
export type reminder_lines_update_column =
  /** column name */
  | 'customer_id'
  /** column name */
  | 'invoice_balance'
  /** column name */
  | 'invoice_date'
  /** column name */
  | 'invoice_due_date'
  /** column name */
  | 'invoice_number'
  /** column name */
  | 'invoice_payment'
  /** column name */
  | 'invoice_to_pay'
  /** column name */
  | 'line_id'
  /** column name */
  | 'our_company'
  /** column name */
  | 'reminder_id'

/** aggregate var_pop on columns */
export type reminder_lines_var_pop_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "reminder_lines" */
export type reminder_lines_var_pop_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type reminder_lines_var_samp_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "reminder_lines" */
export type reminder_lines_var_samp_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type reminder_lines_variance_fields = {
  invoice_balance?: Maybe<Scalars['Float']['output']>
  invoice_payment?: Maybe<Scalars['Float']['output']>
  invoice_to_pay?: Maybe<Scalars['Float']['output']>
  line_id?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "reminder_lines" */
export type reminder_lines_variance_order_by = {
  invoice_balance?: InputMaybe<order_by>
  invoice_payment?: InputMaybe<order_by>
  invoice_to_pay?: InputMaybe<order_by>
  line_id?: InputMaybe<order_by>
}

/** columns and relationships of "route_names" */
export type route_names = {
  route_description?: Maybe<Scalars['String']['output']>
  route_id: Scalars['String']['output']
  route_name: Scalars['String']['output']
}

/** aggregated selection of "route_names" */
export type route_names_aggregate = {
  aggregate?: Maybe<route_names_aggregate_fields>
  nodes: Array<route_names>
}

/** aggregate fields of "route_names" */
export type route_names_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<route_names_max_fields>
  min?: Maybe<route_names_min_fields>
}

/** aggregate fields of "route_names" */
export type route_names_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<route_names_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "route_names" */
export type route_names_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<route_names_max_order_by>
  min?: InputMaybe<route_names_min_order_by>
}

/** input type for inserting array relation for remote table "route_names" */
export type route_names_arr_rel_insert_input = {
  data: Array<route_names_insert_input>
  on_conflict?: InputMaybe<route_names_on_conflict>
}

/** Boolean expression to filter rows from the table "route_names". All fields are combined with a logical 'AND'. */
export type route_names_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<route_names_bool_exp>>>
  _not?: InputMaybe<route_names_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<route_names_bool_exp>>>
  route_description?: InputMaybe<String_comparison_exp>
  route_id?: InputMaybe<String_comparison_exp>
  route_name?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "route_names" */
export type route_names_constraint =
  /** unique or primary key constraint */
  'route_names_pkey'

/** input type for inserting data into table "route_names" */
export type route_names_insert_input = {
  route_description?: InputMaybe<Scalars['String']['input']>
  route_id?: InputMaybe<Scalars['String']['input']>
  route_name?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type route_names_max_fields = {
  route_description?: Maybe<Scalars['String']['output']>
  route_id?: Maybe<Scalars['String']['output']>
  route_name?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "route_names" */
export type route_names_max_order_by = {
  route_description?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  route_name?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type route_names_min_fields = {
  route_description?: Maybe<Scalars['String']['output']>
  route_id?: Maybe<Scalars['String']['output']>
  route_name?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "route_names" */
export type route_names_min_order_by = {
  route_description?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  route_name?: InputMaybe<order_by>
}

/** response of any mutation on the table "route_names" */
export type route_names_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<route_names>
}

/** input type for inserting object relation for remote table "route_names" */
export type route_names_obj_rel_insert_input = {
  data: route_names_insert_input
  on_conflict?: InputMaybe<route_names_on_conflict>
}

/** on conflict condition type for table "route_names" */
export type route_names_on_conflict = {
  constraint: route_names_constraint
  update_columns: Array<route_names_update_column>
  where?: InputMaybe<route_names_bool_exp>
}

/** ordering options when selecting data from "route_names" */
export type route_names_order_by = {
  route_description?: InputMaybe<order_by>
  route_id?: InputMaybe<order_by>
  route_name?: InputMaybe<order_by>
}

/** select columns of table "route_names" */
export type route_names_select_column =
  /** column name */
  | 'route_description'
  /** column name */
  | 'route_id'
  /** column name */
  | 'route_name'

/** input type for updating data in table "route_names" */
export type route_names_set_input = {
  route_description?: InputMaybe<Scalars['String']['input']>
  route_id?: InputMaybe<Scalars['String']['input']>
  route_name?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "route_names" */
export type route_names_update_column =
  /** column name */
  | 'route_description'
  /** column name */
  | 'route_id'
  /** column name */
  | 'route_name'

/** columns and relationships of "stock" */
export type stock = {
  /** An array relationship */
  _goods_transactions: Array<goods_transactions>
  /** An aggregated array relationship */
  _goods_transactions_aggregate: goods_transactions_aggregate
  /** An object relationship */
  _rel_type_stock_group?: Maybe<_type_stock_groups>
  /** An object relationship */
  _rel_type_stock_unit: _type_stock_unit
  /** A computed field, executes function "alarm_message" */
  alarm_message?: Maybe<Scalars['String']['output']>
  campaign_price?: Maybe<Scalars['Int']['output']>
  /** An object relationship */
  company: companies
  company_id: Scalars['String']['output']
  credit_amount?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_current_balance" */
  current_balance?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_current_cost" */
  current_cost?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_current_stock_value" */
  current_stock_value?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_current_unit_cost" */
  current_unit_cost?: Maybe<Scalars['Int']['output']>
  /** An array relationship */
  customer_price_lists: Array<customer_price_list>
  /** An aggregated array relationship */
  customer_price_lists_aggregate: customer_price_list_aggregate
  debit_amount?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_inventory_balance" */
  inventory_balance?: Maybe<Scalars['Int']['output']>
  inventory_cost?: Maybe<Scalars['Int']['output']>
  inventory_credit?: Maybe<Scalars['Int']['output']>
  inventory_debit?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_inventory_purchase_cost" */
  inventory_purchase_cost?: Maybe<Scalars['Int']['output']>
  inventory_revenue: Scalars['Int']['output']
  /** A computed field, executes function "calculate_inventory_stock_value" */
  inventory_stock_value?: Maybe<Scalars['Int']['output']>
  /** A computed field, executes function "calculate_inventory_unit_cost" */
  inventory_unit_cost?: Maybe<Scalars['Int']['output']>
  is_campaign_active: Scalars['Boolean']['output']
  is_outstanding_set?: Maybe<Scalars['String']['output']>
  outstanding_balance?: Maybe<Scalars['Int']['output']>
  outstanding_cost?: Maybe<Scalars['Int']['output']>
  previous_year_ending_balance: Scalars['Int']['output']
  previous_year_ending_cost: Scalars['Int']['output']
  purchase_cost?: Maybe<Scalars['Int']['output']>
  /** An object relationship */
  rel_type_moms_code: _type_moms_code
  stock_alarm: Scalars['Int']['output']
  stock_amount: Scalars['Int']['output']
  stock_description?: Maybe<Scalars['String']['output']>
  stock_group: Scalars['String']['output']
  stock_id: Scalars['String']['output']
  stock_image_link?: Maybe<Scalars['String']['output']>
  stock_is_active: Scalars['Boolean']['output']
  stock_moms: Scalars['Int']['output']
  stock_name: Scalars['String']['output']
  stock_price: Scalars['Int']['output']
  stock_price_a: Scalars['Int']['output']
  stock_price_b: Scalars['Int']['output']
  stock_price_c: Scalars['Int']['output']
  stock_price_d: Scalars['Int']['output']
  stock_price_hra: Scalars['Int']['output']
  stock_price_hrb: Scalars['Int']['output']
  stock_price_hrc: Scalars['Int']['output']
  stock_price_hrd: Scalars['Int']['output']
  stock_price_s: Scalars['Int']['output']
  stock_price_z: Scalars['Int']['output']
  stock_shelf: Scalars['String']['output']
  /** An object relationship */
  stock_stock_rel?: Maybe<stock>
  stock_unit: Scalars['String']['output']
}

/** columns and relationships of "stock" */
export type stock_goods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "stock" */
export type stock_goods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** columns and relationships of "stock" */
export type stockcustomer_price_listsArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** columns and relationships of "stock" */
export type stockcustomer_price_lists_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** aggregated selection of "stock" */
export type stock_aggregate = {
  aggregate?: Maybe<stock_aggregate_fields>
  nodes: Array<stock>
}

/** aggregate fields of "stock" */
export type stock_aggregate_fields = {
  avg?: Maybe<stock_avg_fields>
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<stock_max_fields>
  min?: Maybe<stock_min_fields>
  stddev?: Maybe<stock_stddev_fields>
  stddev_pop?: Maybe<stock_stddev_pop_fields>
  stddev_samp?: Maybe<stock_stddev_samp_fields>
  sum?: Maybe<stock_sum_fields>
  var_pop?: Maybe<stock_var_pop_fields>
  var_samp?: Maybe<stock_var_samp_fields>
  variance?: Maybe<stock_variance_fields>
}

/** aggregate fields of "stock" */
export type stock_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<stock_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "stock" */
export type stock_aggregate_order_by = {
  avg?: InputMaybe<stock_avg_order_by>
  count?: InputMaybe<order_by>
  max?: InputMaybe<stock_max_order_by>
  min?: InputMaybe<stock_min_order_by>
  stddev?: InputMaybe<stock_stddev_order_by>
  stddev_pop?: InputMaybe<stock_stddev_pop_order_by>
  stddev_samp?: InputMaybe<stock_stddev_samp_order_by>
  sum?: InputMaybe<stock_sum_order_by>
  var_pop?: InputMaybe<stock_var_pop_order_by>
  var_samp?: InputMaybe<stock_var_samp_order_by>
  variance?: InputMaybe<stock_variance_order_by>
}

/** input type for inserting array relation for remote table "stock" */
export type stock_arr_rel_insert_input = {
  data: Array<stock_insert_input>
  on_conflict?: InputMaybe<stock_on_conflict>
}

/** aggregate avg on columns */
export type stock_avg_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by avg() on columns of table "stock" */
export type stock_avg_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** Boolean expression to filter rows from the table "stock". All fields are combined with a logical 'AND'. */
export type stock_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<stock_bool_exp>>>
  _goods_transactions?: InputMaybe<goods_transactions_bool_exp>
  _not?: InputMaybe<stock_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<stock_bool_exp>>>
  _rel_type_stock_group?: InputMaybe<_type_stock_groups_bool_exp>
  _rel_type_stock_unit?: InputMaybe<_type_stock_unit_bool_exp>
  campaign_price?: InputMaybe<Int_comparison_exp>
  company?: InputMaybe<companies_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  credit_amount?: InputMaybe<Int_comparison_exp>
  customer_price_lists?: InputMaybe<customer_price_list_bool_exp>
  debit_amount?: InputMaybe<Int_comparison_exp>
  inventory_cost?: InputMaybe<Int_comparison_exp>
  inventory_credit?: InputMaybe<Int_comparison_exp>
  inventory_debit?: InputMaybe<Int_comparison_exp>
  inventory_revenue?: InputMaybe<Int_comparison_exp>
  is_campaign_active?: InputMaybe<Boolean_comparison_exp>
  is_outstanding_set?: InputMaybe<String_comparison_exp>
  outstanding_balance?: InputMaybe<Int_comparison_exp>
  outstanding_cost?: InputMaybe<Int_comparison_exp>
  previous_year_ending_balance?: InputMaybe<Int_comparison_exp>
  previous_year_ending_cost?: InputMaybe<Int_comparison_exp>
  purchase_cost?: InputMaybe<Int_comparison_exp>
  rel_type_moms_code?: InputMaybe<_type_moms_code_bool_exp>
  stock_alarm?: InputMaybe<Int_comparison_exp>
  stock_amount?: InputMaybe<Int_comparison_exp>
  stock_description?: InputMaybe<String_comparison_exp>
  stock_group?: InputMaybe<String_comparison_exp>
  stock_id?: InputMaybe<String_comparison_exp>
  stock_image_link?: InputMaybe<String_comparison_exp>
  stock_is_active?: InputMaybe<Boolean_comparison_exp>
  stock_moms?: InputMaybe<Int_comparison_exp>
  stock_name?: InputMaybe<String_comparison_exp>
  stock_price?: InputMaybe<Int_comparison_exp>
  stock_price_a?: InputMaybe<Int_comparison_exp>
  stock_price_b?: InputMaybe<Int_comparison_exp>
  stock_price_c?: InputMaybe<Int_comparison_exp>
  stock_price_d?: InputMaybe<Int_comparison_exp>
  stock_price_hra?: InputMaybe<Int_comparison_exp>
  stock_price_hrb?: InputMaybe<Int_comparison_exp>
  stock_price_hrc?: InputMaybe<Int_comparison_exp>
  stock_price_hrd?: InputMaybe<Int_comparison_exp>
  stock_price_s?: InputMaybe<Int_comparison_exp>
  stock_price_z?: InputMaybe<Int_comparison_exp>
  stock_shelf?: InputMaybe<String_comparison_exp>
  stock_stock_rel?: InputMaybe<stock_bool_exp>
  stock_unit?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "stock" */
export type stock_constraint =
  /** unique or primary key constraint */
  | 'stock_pkey'
  /** unique or primary key constraint */
  | 'stock_stock_id_company_id_key'

/** input type for incrementing integer columne in table "stock" */
export type stock_inc_input = {
  campaign_price?: InputMaybe<Scalars['Int']['input']>
  credit_amount?: InputMaybe<Scalars['Int']['input']>
  debit_amount?: InputMaybe<Scalars['Int']['input']>
  inventory_cost?: InputMaybe<Scalars['Int']['input']>
  inventory_credit?: InputMaybe<Scalars['Int']['input']>
  inventory_debit?: InputMaybe<Scalars['Int']['input']>
  inventory_revenue?: InputMaybe<Scalars['Int']['input']>
  outstanding_balance?: InputMaybe<Scalars['Int']['input']>
  outstanding_cost?: InputMaybe<Scalars['Int']['input']>
  previous_year_ending_balance?: InputMaybe<Scalars['Int']['input']>
  previous_year_ending_cost?: InputMaybe<Scalars['Int']['input']>
  purchase_cost?: InputMaybe<Scalars['Int']['input']>
  stock_alarm?: InputMaybe<Scalars['Int']['input']>
  stock_amount?: InputMaybe<Scalars['Int']['input']>
  stock_moms?: InputMaybe<Scalars['Int']['input']>
  stock_price?: InputMaybe<Scalars['Int']['input']>
  stock_price_a?: InputMaybe<Scalars['Int']['input']>
  stock_price_b?: InputMaybe<Scalars['Int']['input']>
  stock_price_c?: InputMaybe<Scalars['Int']['input']>
  stock_price_d?: InputMaybe<Scalars['Int']['input']>
  stock_price_hra?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrb?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrc?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrd?: InputMaybe<Scalars['Int']['input']>
  stock_price_s?: InputMaybe<Scalars['Int']['input']>
  stock_price_z?: InputMaybe<Scalars['Int']['input']>
}

/** input type for inserting data into table "stock" */
export type stock_insert_input = {
  _goods_transactions?: InputMaybe<goods_transactions_arr_rel_insert_input>
  _rel_type_stock_group?: InputMaybe<_type_stock_groups_obj_rel_insert_input>
  _rel_type_stock_unit?: InputMaybe<_type_stock_unit_obj_rel_insert_input>
  campaign_price?: InputMaybe<Scalars['Int']['input']>
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  credit_amount?: InputMaybe<Scalars['Int']['input']>
  customer_price_lists?: InputMaybe<customer_price_list_arr_rel_insert_input>
  debit_amount?: InputMaybe<Scalars['Int']['input']>
  inventory_cost?: InputMaybe<Scalars['Int']['input']>
  inventory_credit?: InputMaybe<Scalars['Int']['input']>
  inventory_debit?: InputMaybe<Scalars['Int']['input']>
  inventory_revenue?: InputMaybe<Scalars['Int']['input']>
  is_campaign_active?: InputMaybe<Scalars['Boolean']['input']>
  is_outstanding_set?: InputMaybe<Scalars['String']['input']>
  outstanding_balance?: InputMaybe<Scalars['Int']['input']>
  outstanding_cost?: InputMaybe<Scalars['Int']['input']>
  previous_year_ending_balance?: InputMaybe<Scalars['Int']['input']>
  previous_year_ending_cost?: InputMaybe<Scalars['Int']['input']>
  purchase_cost?: InputMaybe<Scalars['Int']['input']>
  rel_type_moms_code?: InputMaybe<_type_moms_code_obj_rel_insert_input>
  stock_alarm?: InputMaybe<Scalars['Int']['input']>
  stock_amount?: InputMaybe<Scalars['Int']['input']>
  stock_description?: InputMaybe<Scalars['String']['input']>
  stock_group?: InputMaybe<Scalars['String']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
  stock_image_link?: InputMaybe<Scalars['String']['input']>
  stock_is_active?: InputMaybe<Scalars['Boolean']['input']>
  stock_moms?: InputMaybe<Scalars['Int']['input']>
  stock_name?: InputMaybe<Scalars['String']['input']>
  stock_price?: InputMaybe<Scalars['Int']['input']>
  stock_price_a?: InputMaybe<Scalars['Int']['input']>
  stock_price_b?: InputMaybe<Scalars['Int']['input']>
  stock_price_c?: InputMaybe<Scalars['Int']['input']>
  stock_price_d?: InputMaybe<Scalars['Int']['input']>
  stock_price_hra?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrb?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrc?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrd?: InputMaybe<Scalars['Int']['input']>
  stock_price_s?: InputMaybe<Scalars['Int']['input']>
  stock_price_z?: InputMaybe<Scalars['Int']['input']>
  stock_shelf?: InputMaybe<Scalars['String']['input']>
  stock_stock_rel?: InputMaybe<stock_obj_rel_insert_input>
  stock_unit?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type stock_max_fields = {
  campaign_price?: Maybe<Scalars['Int']['output']>
  company_id?: Maybe<Scalars['String']['output']>
  credit_amount?: Maybe<Scalars['Int']['output']>
  debit_amount?: Maybe<Scalars['Int']['output']>
  inventory_cost?: Maybe<Scalars['Int']['output']>
  inventory_credit?: Maybe<Scalars['Int']['output']>
  inventory_debit?: Maybe<Scalars['Int']['output']>
  inventory_revenue?: Maybe<Scalars['Int']['output']>
  is_outstanding_set?: Maybe<Scalars['String']['output']>
  outstanding_balance?: Maybe<Scalars['Int']['output']>
  outstanding_cost?: Maybe<Scalars['Int']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Int']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Int']['output']>
  purchase_cost?: Maybe<Scalars['Int']['output']>
  stock_alarm?: Maybe<Scalars['Int']['output']>
  stock_amount?: Maybe<Scalars['Int']['output']>
  stock_description?: Maybe<Scalars['String']['output']>
  stock_group?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
  stock_image_link?: Maybe<Scalars['String']['output']>
  stock_moms?: Maybe<Scalars['Int']['output']>
  stock_name?: Maybe<Scalars['String']['output']>
  stock_price?: Maybe<Scalars['Int']['output']>
  stock_price_a?: Maybe<Scalars['Int']['output']>
  stock_price_b?: Maybe<Scalars['Int']['output']>
  stock_price_c?: Maybe<Scalars['Int']['output']>
  stock_price_d?: Maybe<Scalars['Int']['output']>
  stock_price_hra?: Maybe<Scalars['Int']['output']>
  stock_price_hrb?: Maybe<Scalars['Int']['output']>
  stock_price_hrc?: Maybe<Scalars['Int']['output']>
  stock_price_hrd?: Maybe<Scalars['Int']['output']>
  stock_price_s?: Maybe<Scalars['Int']['output']>
  stock_price_z?: Maybe<Scalars['Int']['output']>
  stock_shelf?: Maybe<Scalars['String']['output']>
  stock_unit?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "stock" */
export type stock_max_order_by = {
  campaign_price?: InputMaybe<order_by>
  company_id?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  is_outstanding_set?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_description?: InputMaybe<order_by>
  stock_group?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
  stock_image_link?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_name?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
  stock_shelf?: InputMaybe<order_by>
  stock_unit?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type stock_min_fields = {
  campaign_price?: Maybe<Scalars['Int']['output']>
  company_id?: Maybe<Scalars['String']['output']>
  credit_amount?: Maybe<Scalars['Int']['output']>
  debit_amount?: Maybe<Scalars['Int']['output']>
  inventory_cost?: Maybe<Scalars['Int']['output']>
  inventory_credit?: Maybe<Scalars['Int']['output']>
  inventory_debit?: Maybe<Scalars['Int']['output']>
  inventory_revenue?: Maybe<Scalars['Int']['output']>
  is_outstanding_set?: Maybe<Scalars['String']['output']>
  outstanding_balance?: Maybe<Scalars['Int']['output']>
  outstanding_cost?: Maybe<Scalars['Int']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Int']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Int']['output']>
  purchase_cost?: Maybe<Scalars['Int']['output']>
  stock_alarm?: Maybe<Scalars['Int']['output']>
  stock_amount?: Maybe<Scalars['Int']['output']>
  stock_description?: Maybe<Scalars['String']['output']>
  stock_group?: Maybe<Scalars['String']['output']>
  stock_id?: Maybe<Scalars['String']['output']>
  stock_image_link?: Maybe<Scalars['String']['output']>
  stock_moms?: Maybe<Scalars['Int']['output']>
  stock_name?: Maybe<Scalars['String']['output']>
  stock_price?: Maybe<Scalars['Int']['output']>
  stock_price_a?: Maybe<Scalars['Int']['output']>
  stock_price_b?: Maybe<Scalars['Int']['output']>
  stock_price_c?: Maybe<Scalars['Int']['output']>
  stock_price_d?: Maybe<Scalars['Int']['output']>
  stock_price_hra?: Maybe<Scalars['Int']['output']>
  stock_price_hrb?: Maybe<Scalars['Int']['output']>
  stock_price_hrc?: Maybe<Scalars['Int']['output']>
  stock_price_hrd?: Maybe<Scalars['Int']['output']>
  stock_price_s?: Maybe<Scalars['Int']['output']>
  stock_price_z?: Maybe<Scalars['Int']['output']>
  stock_shelf?: Maybe<Scalars['String']['output']>
  stock_unit?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "stock" */
export type stock_min_order_by = {
  campaign_price?: InputMaybe<order_by>
  company_id?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  is_outstanding_set?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_description?: InputMaybe<order_by>
  stock_group?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
  stock_image_link?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_name?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
  stock_shelf?: InputMaybe<order_by>
  stock_unit?: InputMaybe<order_by>
}

/** response of any mutation on the table "stock" */
export type stock_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<stock>
}

/** input type for inserting object relation for remote table "stock" */
export type stock_obj_rel_insert_input = {
  data: stock_insert_input
  on_conflict?: InputMaybe<stock_on_conflict>
}

/** on conflict condition type for table "stock" */
export type stock_on_conflict = {
  constraint: stock_constraint
  update_columns: Array<stock_update_column>
  where?: InputMaybe<stock_bool_exp>
}

/** ordering options when selecting data from "stock" */
export type stock_order_by = {
  _goods_transactions_aggregate?: InputMaybe<goods_transactions_aggregate_order_by>
  _rel_type_stock_group?: InputMaybe<_type_stock_groups_order_by>
  _rel_type_stock_unit?: InputMaybe<_type_stock_unit_order_by>
  campaign_price?: InputMaybe<order_by>
  company?: InputMaybe<companies_order_by>
  company_id?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  customer_price_lists_aggregate?: InputMaybe<customer_price_list_aggregate_order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  is_campaign_active?: InputMaybe<order_by>
  is_outstanding_set?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  rel_type_moms_code?: InputMaybe<_type_moms_code_order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_description?: InputMaybe<order_by>
  stock_group?: InputMaybe<order_by>
  stock_id?: InputMaybe<order_by>
  stock_image_link?: InputMaybe<order_by>
  stock_is_active?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_name?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
  stock_shelf?: InputMaybe<order_by>
  stock_stock_rel?: InputMaybe<stock_order_by>
  stock_unit?: InputMaybe<order_by>
}

/** select columns of table "stock" */
export type stock_select_column =
  /** column name */
  | 'campaign_price'
  /** column name */
  | 'company_id'
  /** column name */
  | 'credit_amount'
  /** column name */
  | 'debit_amount'
  /** column name */
  | 'inventory_cost'
  /** column name */
  | 'inventory_credit'
  /** column name */
  | 'inventory_debit'
  /** column name */
  | 'inventory_revenue'
  /** column name */
  | 'is_campaign_active'
  /** column name */
  | 'is_outstanding_set'
  /** column name */
  | 'outstanding_balance'
  /** column name */
  | 'outstanding_cost'
  /** column name */
  | 'previous_year_ending_balance'
  /** column name */
  | 'previous_year_ending_cost'
  /** column name */
  | 'purchase_cost'
  /** column name */
  | 'stock_alarm'
  /** column name */
  | 'stock_amount'
  /** column name */
  | 'stock_description'
  /** column name */
  | 'stock_group'
  /** column name */
  | 'stock_id'
  /** column name */
  | 'stock_image_link'
  /** column name */
  | 'stock_is_active'
  /** column name */
  | 'stock_moms'
  /** column name */
  | 'stock_name'
  /** column name */
  | 'stock_price'
  /** column name */
  | 'stock_price_a'
  /** column name */
  | 'stock_price_b'
  /** column name */
  | 'stock_price_c'
  /** column name */
  | 'stock_price_d'
  /** column name */
  | 'stock_price_hra'
  /** column name */
  | 'stock_price_hrb'
  /** column name */
  | 'stock_price_hrc'
  /** column name */
  | 'stock_price_hrd'
  /** column name */
  | 'stock_price_s'
  /** column name */
  | 'stock_price_z'
  /** column name */
  | 'stock_shelf'
  /** column name */
  | 'stock_unit'

/** input type for updating data in table "stock" */
export type stock_set_input = {
  campaign_price?: InputMaybe<Scalars['Int']['input']>
  company_id?: InputMaybe<Scalars['String']['input']>
  credit_amount?: InputMaybe<Scalars['Int']['input']>
  debit_amount?: InputMaybe<Scalars['Int']['input']>
  inventory_cost?: InputMaybe<Scalars['Int']['input']>
  inventory_credit?: InputMaybe<Scalars['Int']['input']>
  inventory_debit?: InputMaybe<Scalars['Int']['input']>
  inventory_revenue?: InputMaybe<Scalars['Int']['input']>
  is_campaign_active?: InputMaybe<Scalars['Boolean']['input']>
  is_outstanding_set?: InputMaybe<Scalars['String']['input']>
  outstanding_balance?: InputMaybe<Scalars['Int']['input']>
  outstanding_cost?: InputMaybe<Scalars['Int']['input']>
  previous_year_ending_balance?: InputMaybe<Scalars['Int']['input']>
  previous_year_ending_cost?: InputMaybe<Scalars['Int']['input']>
  purchase_cost?: InputMaybe<Scalars['Int']['input']>
  stock_alarm?: InputMaybe<Scalars['Int']['input']>
  stock_amount?: InputMaybe<Scalars['Int']['input']>
  stock_description?: InputMaybe<Scalars['String']['input']>
  stock_group?: InputMaybe<Scalars['String']['input']>
  stock_id?: InputMaybe<Scalars['String']['input']>
  stock_image_link?: InputMaybe<Scalars['String']['input']>
  stock_is_active?: InputMaybe<Scalars['Boolean']['input']>
  stock_moms?: InputMaybe<Scalars['Int']['input']>
  stock_name?: InputMaybe<Scalars['String']['input']>
  stock_price?: InputMaybe<Scalars['Int']['input']>
  stock_price_a?: InputMaybe<Scalars['Int']['input']>
  stock_price_b?: InputMaybe<Scalars['Int']['input']>
  stock_price_c?: InputMaybe<Scalars['Int']['input']>
  stock_price_d?: InputMaybe<Scalars['Int']['input']>
  stock_price_hra?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrb?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrc?: InputMaybe<Scalars['Int']['input']>
  stock_price_hrd?: InputMaybe<Scalars['Int']['input']>
  stock_price_s?: InputMaybe<Scalars['Int']['input']>
  stock_price_z?: InputMaybe<Scalars['Int']['input']>
  stock_shelf?: InputMaybe<Scalars['String']['input']>
  stock_unit?: InputMaybe<Scalars['String']['input']>
}

/** aggregate stddev on columns */
export type stock_stddev_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by stddev() on columns of table "stock" */
export type stock_stddev_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** aggregate stddev_pop on columns */
export type stock_stddev_pop_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_pop() on columns of table "stock" */
export type stock_stddev_pop_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** aggregate stddev_samp on columns */
export type stock_stddev_samp_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by stddev_samp() on columns of table "stock" */
export type stock_stddev_samp_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** aggregate sum on columns */
export type stock_sum_fields = {
  campaign_price?: Maybe<Scalars['Int']['output']>
  credit_amount?: Maybe<Scalars['Int']['output']>
  debit_amount?: Maybe<Scalars['Int']['output']>
  inventory_cost?: Maybe<Scalars['Int']['output']>
  inventory_credit?: Maybe<Scalars['Int']['output']>
  inventory_debit?: Maybe<Scalars['Int']['output']>
  inventory_revenue?: Maybe<Scalars['Int']['output']>
  outstanding_balance?: Maybe<Scalars['Int']['output']>
  outstanding_cost?: Maybe<Scalars['Int']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Int']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Int']['output']>
  purchase_cost?: Maybe<Scalars['Int']['output']>
  stock_alarm?: Maybe<Scalars['Int']['output']>
  stock_amount?: Maybe<Scalars['Int']['output']>
  stock_moms?: Maybe<Scalars['Int']['output']>
  stock_price?: Maybe<Scalars['Int']['output']>
  stock_price_a?: Maybe<Scalars['Int']['output']>
  stock_price_b?: Maybe<Scalars['Int']['output']>
  stock_price_c?: Maybe<Scalars['Int']['output']>
  stock_price_d?: Maybe<Scalars['Int']['output']>
  stock_price_hra?: Maybe<Scalars['Int']['output']>
  stock_price_hrb?: Maybe<Scalars['Int']['output']>
  stock_price_hrc?: Maybe<Scalars['Int']['output']>
  stock_price_hrd?: Maybe<Scalars['Int']['output']>
  stock_price_s?: Maybe<Scalars['Int']['output']>
  stock_price_z?: Maybe<Scalars['Int']['output']>
}

/** order by sum() on columns of table "stock" */
export type stock_sum_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** update columns of table "stock" */
export type stock_update_column =
  /** column name */
  | 'campaign_price'
  /** column name */
  | 'company_id'
  /** column name */
  | 'credit_amount'
  /** column name */
  | 'debit_amount'
  /** column name */
  | 'inventory_cost'
  /** column name */
  | 'inventory_credit'
  /** column name */
  | 'inventory_debit'
  /** column name */
  | 'inventory_revenue'
  /** column name */
  | 'is_campaign_active'
  /** column name */
  | 'is_outstanding_set'
  /** column name */
  | 'outstanding_balance'
  /** column name */
  | 'outstanding_cost'
  /** column name */
  | 'previous_year_ending_balance'
  /** column name */
  | 'previous_year_ending_cost'
  /** column name */
  | 'purchase_cost'
  /** column name */
  | 'stock_alarm'
  /** column name */
  | 'stock_amount'
  /** column name */
  | 'stock_description'
  /** column name */
  | 'stock_group'
  /** column name */
  | 'stock_id'
  /** column name */
  | 'stock_image_link'
  /** column name */
  | 'stock_is_active'
  /** column name */
  | 'stock_moms'
  /** column name */
  | 'stock_name'
  /** column name */
  | 'stock_price'
  /** column name */
  | 'stock_price_a'
  /** column name */
  | 'stock_price_b'
  /** column name */
  | 'stock_price_c'
  /** column name */
  | 'stock_price_d'
  /** column name */
  | 'stock_price_hra'
  /** column name */
  | 'stock_price_hrb'
  /** column name */
  | 'stock_price_hrc'
  /** column name */
  | 'stock_price_hrd'
  /** column name */
  | 'stock_price_s'
  /** column name */
  | 'stock_price_z'
  /** column name */
  | 'stock_shelf'
  /** column name */
  | 'stock_unit'

/** aggregate var_pop on columns */
export type stock_var_pop_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by var_pop() on columns of table "stock" */
export type stock_var_pop_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** aggregate var_samp on columns */
export type stock_var_samp_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by var_samp() on columns of table "stock" */
export type stock_var_samp_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** aggregate variance on columns */
export type stock_variance_fields = {
  campaign_price?: Maybe<Scalars['Float']['output']>
  credit_amount?: Maybe<Scalars['Float']['output']>
  debit_amount?: Maybe<Scalars['Float']['output']>
  inventory_cost?: Maybe<Scalars['Float']['output']>
  inventory_credit?: Maybe<Scalars['Float']['output']>
  inventory_debit?: Maybe<Scalars['Float']['output']>
  inventory_revenue?: Maybe<Scalars['Float']['output']>
  outstanding_balance?: Maybe<Scalars['Float']['output']>
  outstanding_cost?: Maybe<Scalars['Float']['output']>
  previous_year_ending_balance?: Maybe<Scalars['Float']['output']>
  previous_year_ending_cost?: Maybe<Scalars['Float']['output']>
  purchase_cost?: Maybe<Scalars['Float']['output']>
  stock_alarm?: Maybe<Scalars['Float']['output']>
  stock_amount?: Maybe<Scalars['Float']['output']>
  stock_moms?: Maybe<Scalars['Float']['output']>
  stock_price?: Maybe<Scalars['Float']['output']>
  stock_price_a?: Maybe<Scalars['Float']['output']>
  stock_price_b?: Maybe<Scalars['Float']['output']>
  stock_price_c?: Maybe<Scalars['Float']['output']>
  stock_price_d?: Maybe<Scalars['Float']['output']>
  stock_price_hra?: Maybe<Scalars['Float']['output']>
  stock_price_hrb?: Maybe<Scalars['Float']['output']>
  stock_price_hrc?: Maybe<Scalars['Float']['output']>
  stock_price_hrd?: Maybe<Scalars['Float']['output']>
  stock_price_s?: Maybe<Scalars['Float']['output']>
  stock_price_z?: Maybe<Scalars['Float']['output']>
}

/** order by variance() on columns of table "stock" */
export type stock_variance_order_by = {
  campaign_price?: InputMaybe<order_by>
  credit_amount?: InputMaybe<order_by>
  debit_amount?: InputMaybe<order_by>
  inventory_cost?: InputMaybe<order_by>
  inventory_credit?: InputMaybe<order_by>
  inventory_debit?: InputMaybe<order_by>
  inventory_revenue?: InputMaybe<order_by>
  outstanding_balance?: InputMaybe<order_by>
  outstanding_cost?: InputMaybe<order_by>
  previous_year_ending_balance?: InputMaybe<order_by>
  previous_year_ending_cost?: InputMaybe<order_by>
  purchase_cost?: InputMaybe<order_by>
  stock_alarm?: InputMaybe<order_by>
  stock_amount?: InputMaybe<order_by>
  stock_moms?: InputMaybe<order_by>
  stock_price?: InputMaybe<order_by>
  stock_price_a?: InputMaybe<order_by>
  stock_price_b?: InputMaybe<order_by>
  stock_price_c?: InputMaybe<order_by>
  stock_price_d?: InputMaybe<order_by>
  stock_price_hra?: InputMaybe<order_by>
  stock_price_hrb?: InputMaybe<order_by>
  stock_price_hrc?: InputMaybe<order_by>
  stock_price_hrd?: InputMaybe<order_by>
  stock_price_s?: InputMaybe<order_by>
  stock_price_z?: InputMaybe<order_by>
}

/** subscription root */
export type subscription_root = {
  /** fetch data from the table: "__admin_pass" */
  __admin_pass: Array<__admin_pass>
  /** fetch aggregated fields from the table: "__admin_pass" */
  __admin_pass_aggregate: __admin_pass_aggregate
  /** fetch data from the table: "__admin_pass" using primary key columns */
  __admin_pass_by_pk?: Maybe<__admin_pass>
  /** fetch data from the table: "__privilege_pass" */
  __privilege_pass: Array<__privilege_pass>
  /** fetch aggregated fields from the table: "__privilege_pass" */
  __privilege_pass_aggregate: __privilege_pass_aggregate
  /** fetch data from the table: "__privilege_pass" using primary key columns */
  __privilege_pass_by_pk?: Maybe<__privilege_pass>
  /** fetch data from the table: "_our_companies_persistent_state" */
  _our_companies_persistent_state: Array<_our_companies_persistent_state>
  /** fetch aggregated fields from the table: "_our_companies_persistent_state" */
  _our_companies_persistent_state_aggregate: _our_companies_persistent_state_aggregate
  /** fetch data from the table: "_our_companies_persistent_state" using primary key columns */
  _our_companies_persistent_state_by_pk?: Maybe<_our_companies_persistent_state>
  /** fetch data from the table: "_type_account_plan" */
  _type_account_plan: Array<_type_account_plan>
  /** fetch aggregated fields from the table: "_type_account_plan" */
  _type_account_plan_aggregate: _type_account_plan_aggregate
  /** fetch data from the table: "_type_account_plan" using primary key columns */
  _type_account_plan_by_pk?: Maybe<_type_account_plan>
  /** fetch data from the table: "_type_moms_code" */
  _type_moms_code: Array<_type_moms_code>
  /** fetch aggregated fields from the table: "_type_moms_code" */
  _type_moms_code_aggregate: _type_moms_code_aggregate
  /** fetch data from the table: "_type_moms_code" using primary key columns */
  _type_moms_code_by_pk?: Maybe<_type_moms_code>
  /** fetch data from the table: "_type_stock_groups" */
  _type_stock_groups: Array<_type_stock_groups>
  /** fetch aggregated fields from the table: "_type_stock_groups" */
  _type_stock_groups_aggregate: _type_stock_groups_aggregate
  /** fetch data from the table: "_type_stock_groups" using primary key columns */
  _type_stock_groups_by_pk?: Maybe<_type_stock_groups>
  /** fetch data from the table: "_type_stock_unit" */
  _type_stock_unit: Array<_type_stock_unit>
  /** fetch aggregated fields from the table: "_type_stock_unit" */
  _type_stock_unit_aggregate: _type_stock_unit_aggregate
  /** fetch data from the table: "_type_stock_unit" using primary key columns */
  _type_stock_unit_by_pk?: Maybe<_type_stock_unit>
  /** fetch data from the table: "_ups_order_settings" */
  _ups_order_settings: Array<_ups_order_settings>
  /** fetch aggregated fields from the table: "_ups_order_settings" */
  _ups_order_settings_aggregate: _ups_order_settings_aggregate
  /** fetch data from the table: "_ups_order_settings" using primary key columns */
  _ups_order_settings_by_pk?: Maybe<_ups_order_settings>
  /** fetch data from the table: "_ups_report_settings" */
  _ups_report_settings: Array<_ups_report_settings>
  /** fetch aggregated fields from the table: "_ups_report_settings" */
  _ups_report_settings_aggregate: _ups_report_settings_aggregate
  /** fetch data from the table: "_ups_report_settings" using primary key columns */
  _ups_report_settings_by_pk?: Maybe<_ups_report_settings>
  /** fetch data from the table: "_user_persistent_state" */
  _user_persistent_state: Array<_user_persistent_state>
  /** fetch aggregated fields from the table: "_user_persistent_state" */
  _user_persistent_state_aggregate: _user_persistent_state_aggregate
  /** fetch data from the table: "_user_persistent_state" using primary key columns */
  _user_persistent_state_by_pk?: Maybe<_user_persistent_state>
  /** fetch data from the table: "addresses" */
  addresses: Array<addresses>
  /** fetch aggregated fields from the table: "addresses" */
  addresses_aggregate: addresses_aggregate
  /** fetch data from the table: "addresses" using primary key columns */
  addresses_by_pk?: Maybe<addresses>
  /** fetch data from the table: "addresses_cities" */
  addresses_cities: Array<addresses_cities>
  /** fetch aggregated fields from the table: "addresses_cities" */
  addresses_cities_aggregate: addresses_cities_aggregate
  /** fetch data from the table: "addresses_cities" using primary key columns */
  addresses_cities_by_pk?: Maybe<addresses_cities>
  /** fetch data from the table: "addresses_opening_times" */
  addresses_opening_times: Array<addresses_opening_times>
  /** fetch aggregated fields from the table: "addresses_opening_times" */
  addresses_opening_times_aggregate: addresses_opening_times_aggregate
  /** fetch data from the table: "addresses_opening_times" using primary key columns */
  addresses_opening_times_by_pk?: Maybe<addresses_opening_times>
  /** fetch data from the table: "adresses_routes" */
  adresses_routes: Array<adresses_routes>
  /** fetch aggregated fields from the table: "adresses_routes" */
  adresses_routes_aggregate: adresses_routes_aggregate
  /** fetch data from the table: "adresses_routes" using primary key columns */
  adresses_routes_by_pk?: Maybe<adresses_routes>
  /** fetch data from the table: "bank_accounts" */
  bank_accounts: Array<bank_accounts>
  /** fetch aggregated fields from the table: "bank_accounts" */
  bank_accounts_aggregate: bank_accounts_aggregate
  /** fetch data from the table: "bank_accounts" using primary key columns */
  bank_accounts_by_pk?: Maybe<bank_accounts>
  /** fetch data from the table: "book_keep_headers" */
  book_keep_headers: Array<book_keep_headers>
  /** fetch aggregated fields from the table: "book_keep_headers" */
  book_keep_headers_aggregate: book_keep_headers_aggregate
  /** fetch data from the table: "book_keep_headers" using primary key columns */
  book_keep_headers_by_pk?: Maybe<book_keep_headers>
  /** fetch data from the table: "book_keep_lines" */
  book_keep_lines: Array<book_keep_lines>
  /** fetch aggregated fields from the table: "book_keep_lines" */
  book_keep_lines_aggregate: book_keep_lines_aggregate
  /** fetch data from the table: "book_keep_lines" using primary key columns */
  book_keep_lines_by_pk?: Maybe<book_keep_lines>
  /** fetch data from the table: "collect_payment_report_headers" */
  collect_payment_report_headers: Array<collect_payment_report_headers>
  /** fetch aggregated fields from the table: "collect_payment_report_headers" */
  collect_payment_report_headers_aggregate: collect_payment_report_headers_aggregate
  /** fetch data from the table: "collect_payment_report_headers" using primary key columns */
  collect_payment_report_headers_by_pk?: Maybe<collect_payment_report_headers>
  /** fetch data from the table: "companies" */
  companies: Array<companies>
  /** fetch aggregated fields from the table: "companies" */
  companies_aggregate: companies_aggregate
  /** fetch data from the table: "companies" using primary key columns */
  companies_by_pk?: Maybe<companies>
  /** fetch data from the table: "customer_bookmarks" */
  customer_bookmarks: Array<customer_bookmarks>
  /** fetch aggregated fields from the table: "customer_bookmarks" */
  customer_bookmarks_aggregate: customer_bookmarks_aggregate
  /** fetch data from the table: "customer_bookmarks" using primary key columns */
  customer_bookmarks_by_pk?: Maybe<customer_bookmarks>
  /** fetch data from the table: "customer_price_list" */
  customer_price_list: Array<customer_price_list>
  /** fetch aggregated fields from the table: "customer_price_list" */
  customer_price_list_aggregate: customer_price_list_aggregate
  /** fetch data from the table: "customer_price_list" using primary key columns */
  customer_price_list_by_pk?: Maybe<customer_price_list>
  /** fetch data from the table: "customers" */
  customers: Array<customers>
  /** fetch aggregated fields from the table: "customers" */
  customers_aggregate: customers_aggregate
  /** fetch data from the table: "customers" using primary key columns */
  customers_by_pk?: Maybe<customers>
  /** fetch data from the table: "customers_visits" */
  customers_visits: Array<customers_visits>
  /** fetch aggregated fields from the table: "customers_visits" */
  customers_visits_aggregate: customers_visits_aggregate
  /** fetch data from the table: "customers_visits" using primary key columns */
  customers_visits_by_pk?: Maybe<customers_visits>
  /** fetch data from the table: "deliveries" */
  deliveries: Array<deliveries>
  /** fetch aggregated fields from the table: "deliveries" */
  deliveries_aggregate: deliveries_aggregate
  /** fetch data from the table: "deliveries" using primary key columns */
  deliveries_by_pk?: Maybe<deliveries>
  /** fetch data from the table: "deliveries_list_lines" */
  deliveries_list_lines: Array<deliveries_list_lines>
  /** fetch aggregated fields from the table: "deliveries_list_lines" */
  deliveries_list_lines_aggregate: deliveries_list_lines_aggregate
  /** fetch data from the table: "deliveries_list_lines" using primary key columns */
  deliveries_list_lines_by_pk?: Maybe<deliveries_list_lines>
  /** fetch data from the table: "dispatch_headers" */
  dispatch_headers: Array<dispatch_headers>
  /** fetch aggregated fields from the table: "dispatch_headers" */
  dispatch_headers_aggregate: dispatch_headers_aggregate
  /** fetch data from the table: "dispatch_headers" using primary key columns */
  dispatch_headers_by_pk?: Maybe<dispatch_headers>
  /** fetch data from the table: "document_transactions" */
  document_transactions: Array<document_transactions>
  /** fetch aggregated fields from the table: "document_transactions" */
  document_transactions_aggregate: document_transactions_aggregate
  /** fetch data from the table: "document_transactions" using primary key columns */
  document_transactions_by_pk?: Maybe<document_transactions>
  /** fetch data from the table: "drivers" */
  drivers: Array<drivers>
  /** fetch aggregated fields from the table: "drivers" */
  drivers_aggregate: drivers_aggregate
  /** fetch data from the table: "drivers" using primary key columns */
  drivers_by_pk?: Maybe<drivers>
  /** fetch data from the table: "goods_transactions" */
  goods_transactions: Array<goods_transactions>
  /** fetch aggregated fields from the table: "goods_transactions" */
  goods_transactions_aggregate: goods_transactions_aggregate
  /** fetch data from the table: "goods_transactions" using primary key columns */
  goods_transactions_by_pk?: Maybe<goods_transactions>
  /** fetch data from the table: "invoice_book_keep_headers" */
  invoice_book_keep_headers: Array<invoice_book_keep_headers>
  /** fetch aggregated fields from the table: "invoice_book_keep_headers" */
  invoice_book_keep_headers_aggregate: invoice_book_keep_headers_aggregate
  /** fetch data from the table: "invoice_book_keep_headers" using primary key columns */
  invoice_book_keep_headers_by_pk?: Maybe<invoice_book_keep_headers>
  /** fetch data from the table: "invoice_book_keep_lines" */
  invoice_book_keep_lines: Array<invoice_book_keep_lines>
  /** fetch aggregated fields from the table: "invoice_book_keep_lines" */
  invoice_book_keep_lines_aggregate: invoice_book_keep_lines_aggregate
  /** fetch data from the table: "invoice_book_keep_lines" using primary key columns */
  invoice_book_keep_lines_by_pk?: Maybe<invoice_book_keep_lines>
  /** fetch data from the table: "invoice_journal_headers" */
  invoice_journal_headers: Array<invoice_journal_headers>
  /** fetch aggregated fields from the table: "invoice_journal_headers" */
  invoice_journal_headers_aggregate: invoice_journal_headers_aggregate
  /** fetch data from the table: "invoice_journal_headers" using primary key columns */
  invoice_journal_headers_by_pk?: Maybe<invoice_journal_headers>
  /** fetch data from the table: "order_headers" */
  order_headers: Array<order_headers>
  /** fetch aggregated fields from the table: "order_headers" */
  order_headers_aggregate: order_headers_aggregate
  /** fetch data from the table: "order_headers" using primary key columns */
  order_headers_by_pk?: Maybe<order_headers>
  /** fetch data from the table: "payments" */
  payments: Array<payments>
  /** fetch aggregated fields from the table: "payments" */
  payments_aggregate: payments_aggregate
  /** fetch data from the table: "payments" using primary key columns */
  payments_by_pk?: Maybe<payments>
  /** fetch data from the table: "reminder_headers" */
  reminder_headers: Array<reminder_headers>
  /** fetch aggregated fields from the table: "reminder_headers" */
  reminder_headers_aggregate: reminder_headers_aggregate
  /** fetch data from the table: "reminder_headers" using primary key columns */
  reminder_headers_by_pk?: Maybe<reminder_headers>
  /** fetch data from the table: "reminder_lines" */
  reminder_lines: Array<reminder_lines>
  /** fetch aggregated fields from the table: "reminder_lines" */
  reminder_lines_aggregate: reminder_lines_aggregate
  /** fetch data from the table: "reminder_lines" using primary key columns */
  reminder_lines_by_pk?: Maybe<reminder_lines>
  /** fetch data from the table: "route_names" */
  route_names: Array<route_names>
  /** fetch aggregated fields from the table: "route_names" */
  route_names_aggregate: route_names_aggregate
  /** fetch data from the table: "route_names" using primary key columns */
  route_names_by_pk?: Maybe<route_names>
  /** fetch data from the table: "stock" */
  stock: Array<stock>
  /** fetch aggregated fields from the table: "stock" */
  stock_aggregate: stock_aggregate
  /** fetch data from the table: "stock" using primary key columns */
  stock_by_pk?: Maybe<stock>
  /** fetch data from the table: "telephones" */
  telephones: Array<telephones>
  /** fetch aggregated fields from the table: "telephones" */
  telephones_aggregate: telephones_aggregate
  /** fetch data from the table: "telephones" using primary key columns */
  telephones_by_pk?: Maybe<telephones>
  /** fetch data from the table: "users" */
  users: Array<users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: users_aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<users>
  /** fetch data from the table: "vehicles" */
  vehicles: Array<vehicles>
  /** fetch aggregated fields from the table: "vehicles" */
  vehicles_aggregate: vehicles_aggregate
  /** fetch data from the table: "vehicles" using primary key columns */
  vehicles_by_pk?: Maybe<vehicles>
}

/** subscription root */
export type subscription_root__admin_passArgs = {
  distinct_on?: InputMaybe<Array<__admin_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__admin_pass_order_by>>
  where?: InputMaybe<__admin_pass_bool_exp>
}

/** subscription root */
export type subscription_root__admin_pass_aggregateArgs = {
  distinct_on?: InputMaybe<Array<__admin_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__admin_pass_order_by>>
  where?: InputMaybe<__admin_pass_bool_exp>
}

/** subscription root */
export type subscription_root__admin_pass_by_pkArgs = {
  admin_pass_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_root__privilege_passArgs = {
  distinct_on?: InputMaybe<Array<__privilege_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__privilege_pass_order_by>>
  where?: InputMaybe<__privilege_pass_bool_exp>
}

/** subscription root */
export type subscription_root__privilege_pass_aggregateArgs = {
  distinct_on?: InputMaybe<Array<__privilege_pass_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<__privilege_pass_order_by>>
  where?: InputMaybe<__privilege_pass_bool_exp>
}

/** subscription root */
export type subscription_root__privilege_pass_by_pkArgs = {
  privilege_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_root_our_companies_persistent_stateArgs = {
  distinct_on?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_our_companies_persistent_state_order_by>>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** subscription root */
export type subscription_root_our_companies_persistent_state_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_our_companies_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_our_companies_persistent_state_order_by>>
  where?: InputMaybe<_our_companies_persistent_state_bool_exp>
}

/** subscription root */
export type subscription_root_our_companies_persistent_state_by_pkArgs = {
  company_nickname: Scalars['String']['input']
}

/** subscription root */
export type subscription_root_type_account_planArgs = {
  distinct_on?: InputMaybe<Array<_type_account_plan_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_account_plan_order_by>>
  where?: InputMaybe<_type_account_plan_bool_exp>
}

/** subscription root */
export type subscription_root_type_account_plan_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_account_plan_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_account_plan_order_by>>
  where?: InputMaybe<_type_account_plan_bool_exp>
}

/** subscription root */
export type subscription_root_type_account_plan_by_pkArgs = {
  account_id_name: Scalars['String']['input']
}

/** subscription root */
export type subscription_root_type_moms_codeArgs = {
  distinct_on?: InputMaybe<Array<_type_moms_code_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_moms_code_order_by>>
  where?: InputMaybe<_type_moms_code_bool_exp>
}

/** subscription root */
export type subscription_root_type_moms_code_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_moms_code_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_moms_code_order_by>>
  where?: InputMaybe<_type_moms_code_bool_exp>
}

/** subscription root */
export type subscription_root_type_moms_code_by_pkArgs = {
  moms_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_root_type_stock_groupsArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_groups_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_groups_order_by>>
  where?: InputMaybe<_type_stock_groups_bool_exp>
}

/** subscription root */
export type subscription_root_type_stock_groups_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_groups_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_groups_order_by>>
  where?: InputMaybe<_type_stock_groups_bool_exp>
}

/** subscription root */
export type subscription_root_type_stock_groups_by_pkArgs = {
  our_company: Scalars['String']['input']
  stock_groups: Scalars['String']['input']
}

/** subscription root */
export type subscription_root_type_stock_unitArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_unit_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_unit_order_by>>
  where?: InputMaybe<_type_stock_unit_bool_exp>
}

/** subscription root */
export type subscription_root_type_stock_unit_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_type_stock_unit_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_type_stock_unit_order_by>>
  where?: InputMaybe<_type_stock_unit_bool_exp>
}

/** subscription root */
export type subscription_root_type_stock_unit_by_pkArgs = {
  stock_unit: Scalars['String']['input']
}

/** subscription root */
export type subscription_root_ups_order_settingsArgs = {
  distinct_on?: InputMaybe<Array<_ups_order_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_order_settings_order_by>>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** subscription root */
export type subscription_root_ups_order_settings_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_ups_order_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_order_settings_order_by>>
  where?: InputMaybe<_ups_order_settings_bool_exp>
}

/** subscription root */
export type subscription_root_ups_order_settings_by_pkArgs = {
  user_nickname: Scalars['String']['input']
}

/** subscription root */
export type subscription_root_ups_report_settingsArgs = {
  distinct_on?: InputMaybe<Array<_ups_report_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_report_settings_order_by>>
  where?: InputMaybe<_ups_report_settings_bool_exp>
}

/** subscription root */
export type subscription_root_ups_report_settings_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_ups_report_settings_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_ups_report_settings_order_by>>
  where?: InputMaybe<_ups_report_settings_bool_exp>
}

/** subscription root */
export type subscription_root_ups_report_settings_by_pkArgs = {
  _preset_name: Scalars['String']['input']
}

/** subscription root */
export type subscription_root_user_persistent_stateArgs = {
  distinct_on?: InputMaybe<Array<_user_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_user_persistent_state_order_by>>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** subscription root */
export type subscription_root_user_persistent_state_aggregateArgs = {
  distinct_on?: InputMaybe<Array<_user_persistent_state_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<_user_persistent_state_order_by>>
  where?: InputMaybe<_user_persistent_state_bool_exp>
}

/** subscription root */
export type subscription_root_user_persistent_state_by_pkArgs = {
  user_nickname: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootaddressesArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** subscription root */
export type subscription_rootaddresses_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_order_by>>
  where?: InputMaybe<addresses_bool_exp>
}

/** subscription root */
export type subscription_rootaddresses_by_pkArgs = {
  address_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootaddresses_citiesArgs = {
  distinct_on?: InputMaybe<Array<addresses_cities_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_cities_order_by>>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** subscription root */
export type subscription_rootaddresses_cities_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_cities_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_cities_order_by>>
  where?: InputMaybe<addresses_cities_bool_exp>
}

/** subscription root */
export type subscription_rootaddresses_cities_by_pkArgs = {
  city_name: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootaddresses_opening_timesArgs = {
  distinct_on?: InputMaybe<Array<addresses_opening_times_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_opening_times_order_by>>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** subscription root */
export type subscription_rootaddresses_opening_times_aggregateArgs = {
  distinct_on?: InputMaybe<Array<addresses_opening_times_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<addresses_opening_times_order_by>>
  where?: InputMaybe<addresses_opening_times_bool_exp>
}

/** subscription root */
export type subscription_rootaddresses_opening_times_by_pkArgs = {
  address_id: Scalars['Int']['input']
  day_of_week: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootadresses_routesArgs = {
  distinct_on?: InputMaybe<Array<adresses_routes_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<adresses_routes_order_by>>
  where?: InputMaybe<adresses_routes_bool_exp>
}

/** subscription root */
export type subscription_rootadresses_routes_aggregateArgs = {
  distinct_on?: InputMaybe<Array<adresses_routes_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<adresses_routes_order_by>>
  where?: InputMaybe<adresses_routes_bool_exp>
}

/** subscription root */
export type subscription_rootadresses_routes_by_pkArgs = {
  route_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootbank_accountsArgs = {
  distinct_on?: InputMaybe<Array<bank_accounts_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<bank_accounts_order_by>>
  where?: InputMaybe<bank_accounts_bool_exp>
}

/** subscription root */
export type subscription_rootbank_accounts_aggregateArgs = {
  distinct_on?: InputMaybe<Array<bank_accounts_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<bank_accounts_order_by>>
  where?: InputMaybe<bank_accounts_bool_exp>
}

/** subscription root */
export type subscription_rootbank_accounts_by_pkArgs = {
  bank_account_id: Scalars['uuid']['input']
}

/** subscription root */
export type subscription_rootbook_keep_headersArgs = {
  distinct_on?: InputMaybe<Array<book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_headers_order_by>>
  where?: InputMaybe<book_keep_headers_bool_exp>
}

/** subscription root */
export type subscription_rootbook_keep_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_headers_order_by>>
  where?: InputMaybe<book_keep_headers_bool_exp>
}

/** subscription root */
export type subscription_rootbook_keep_headers_by_pkArgs = {
  book_keep_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootbook_keep_linesArgs = {
  distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_lines_order_by>>
  where?: InputMaybe<book_keep_lines_bool_exp>
}

/** subscription root */
export type subscription_rootbook_keep_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<book_keep_lines_order_by>>
  where?: InputMaybe<book_keep_lines_bool_exp>
}

/** subscription root */
export type subscription_rootbook_keep_lines_by_pkArgs = {
  line_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootcollect_payment_report_headersArgs = {
  distinct_on?: InputMaybe<Array<collect_payment_report_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<collect_payment_report_headers_order_by>>
  where?: InputMaybe<collect_payment_report_headers_bool_exp>
}

/** subscription root */
export type subscription_rootcollect_payment_report_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<collect_payment_report_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<collect_payment_report_headers_order_by>>
  where?: InputMaybe<collect_payment_report_headers_bool_exp>
}

/** subscription root */
export type subscription_rootcollect_payment_report_headers_by_pkArgs = {
  report_number: Scalars['Int']['input']
  report_type: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootcompaniesArgs = {
  distinct_on?: InputMaybe<Array<companies_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<companies_order_by>>
  where?: InputMaybe<companies_bool_exp>
}

/** subscription root */
export type subscription_rootcompanies_aggregateArgs = {
  distinct_on?: InputMaybe<Array<companies_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<companies_order_by>>
  where?: InputMaybe<companies_bool_exp>
}

/** subscription root */
export type subscription_rootcompanies_by_pkArgs = {
  company_nickname: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootcustomer_bookmarksArgs = {
  distinct_on?: InputMaybe<Array<customer_bookmarks_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_bookmarks_order_by>>
  where?: InputMaybe<customer_bookmarks_bool_exp>
}

/** subscription root */
export type subscription_rootcustomer_bookmarks_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_bookmarks_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_bookmarks_order_by>>
  where?: InputMaybe<customer_bookmarks_bool_exp>
}

/** subscription root */
export type subscription_rootcustomer_bookmarks_by_pkArgs = {
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootcustomer_price_listArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** subscription root */
export type subscription_rootcustomer_price_list_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customer_price_list_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customer_price_list_order_by>>
  where?: InputMaybe<customer_price_list_bool_exp>
}

/** subscription root */
export type subscription_rootcustomer_price_list_by_pkArgs = {
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootcustomersArgs = {
  distinct_on?: InputMaybe<Array<customers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_order_by>>
  where?: InputMaybe<customers_bool_exp>
}

/** subscription root */
export type subscription_rootcustomers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_order_by>>
  where?: InputMaybe<customers_bool_exp>
}

/** subscription root */
export type subscription_rootcustomers_by_pkArgs = {
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootcustomers_visitsArgs = {
  distinct_on?: InputMaybe<Array<customers_visits_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_visits_order_by>>
  where?: InputMaybe<customers_visits_bool_exp>
}

/** subscription root */
export type subscription_rootcustomers_visits_aggregateArgs = {
  distinct_on?: InputMaybe<Array<customers_visits_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<customers_visits_order_by>>
  where?: InputMaybe<customers_visits_bool_exp>
}

/** subscription root */
export type subscription_rootcustomers_visits_by_pkArgs = {
  visit_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootdeliveriesArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** subscription root */
export type subscription_rootdeliveries_aggregateArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** subscription root */
export type subscription_rootdeliveries_by_pkArgs = {
  delivery_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootdeliveries_list_linesArgs = {
  distinct_on?: InputMaybe<Array<deliveries_list_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_list_lines_order_by>>
  where?: InputMaybe<deliveries_list_lines_bool_exp>
}

/** subscription root */
export type subscription_rootdeliveries_list_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<deliveries_list_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_list_lines_order_by>>
  where?: InputMaybe<deliveries_list_lines_bool_exp>
}

/** subscription root */
export type subscription_rootdeliveries_list_lines_by_pkArgs = {
  dispatch_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootdispatch_headersArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** subscription root */
export type subscription_rootdispatch_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<dispatch_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<dispatch_headers_order_by>>
  where?: InputMaybe<dispatch_headers_bool_exp>
}

/** subscription root */
export type subscription_rootdispatch_headers_by_pkArgs = {
  dispatch_number: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootdocument_transactionsArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** subscription root */
export type subscription_rootdocument_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<document_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<document_transactions_order_by>>
  where?: InputMaybe<document_transactions_bool_exp>
}

/** subscription root */
export type subscription_rootdocument_transactions_by_pkArgs = {
  document_transaction_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootdriversArgs = {
  distinct_on?: InputMaybe<Array<drivers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<drivers_order_by>>
  where?: InputMaybe<drivers_bool_exp>
}

/** subscription root */
export type subscription_rootdrivers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<drivers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<drivers_order_by>>
  where?: InputMaybe<drivers_bool_exp>
}

/** subscription root */
export type subscription_rootdrivers_by_pkArgs = {
  driver_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootgoods_transactionsArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** subscription root */
export type subscription_rootgoods_transactions_aggregateArgs = {
  distinct_on?: InputMaybe<Array<goods_transactions_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<goods_transactions_order_by>>
  where?: InputMaybe<goods_transactions_bool_exp>
}

/** subscription root */
export type subscription_rootgoods_transactions_by_pkArgs = {
  goods_transaction_id: Scalars['uuid']['input']
}

/** subscription root */
export type subscription_rootinvoice_book_keep_headersArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_headers_order_by>>
  where?: InputMaybe<invoice_book_keep_headers_bool_exp>
}

/** subscription root */
export type subscription_rootinvoice_book_keep_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_headers_order_by>>
  where?: InputMaybe<invoice_book_keep_headers_bool_exp>
}

/** subscription root */
export type subscription_rootinvoice_book_keep_headers_by_pkArgs = {
  book_keep_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootinvoice_book_keep_linesArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** subscription root */
export type subscription_rootinvoice_book_keep_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_book_keep_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_book_keep_lines_order_by>>
  where?: InputMaybe<invoice_book_keep_lines_bool_exp>
}

/** subscription root */
export type subscription_rootinvoice_book_keep_lines_by_pkArgs = {
  line_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootinvoice_journal_headersArgs = {
  distinct_on?: InputMaybe<Array<invoice_journal_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_journal_headers_order_by>>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** subscription root */
export type subscription_rootinvoice_journal_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<invoice_journal_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<invoice_journal_headers_order_by>>
  where?: InputMaybe<invoice_journal_headers_bool_exp>
}

/** subscription root */
export type subscription_rootinvoice_journal_headers_by_pkArgs = {
  report_number: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootorder_headersArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** subscription root */
export type subscription_rootorder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<order_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<order_headers_order_by>>
  where?: InputMaybe<order_headers_bool_exp>
}

/** subscription root */
export type subscription_rootorder_headers_by_pkArgs = {
  order_number: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootpaymentsArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** subscription root */
export type subscription_rootpayments_aggregateArgs = {
  distinct_on?: InputMaybe<Array<payments_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<payments_order_by>>
  where?: InputMaybe<payments_bool_exp>
}

/** subscription root */
export type subscription_rootpayments_by_pkArgs = {
  payment_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootreminder_headersArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** subscription root */
export type subscription_rootreminder_headers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_headers_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_headers_order_by>>
  where?: InputMaybe<reminder_headers_bool_exp>
}

/** subscription root */
export type subscription_rootreminder_headers_by_pkArgs = {
  reminder_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootreminder_linesArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** subscription root */
export type subscription_rootreminder_lines_aggregateArgs = {
  distinct_on?: InputMaybe<Array<reminder_lines_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<reminder_lines_order_by>>
  where?: InputMaybe<reminder_lines_bool_exp>
}

/** subscription root */
export type subscription_rootreminder_lines_by_pkArgs = {
  line_id: Scalars['Int']['input']
}

/** subscription root */
export type subscription_rootroute_namesArgs = {
  distinct_on?: InputMaybe<Array<route_names_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<route_names_order_by>>
  where?: InputMaybe<route_names_bool_exp>
}

/** subscription root */
export type subscription_rootroute_names_aggregateArgs = {
  distinct_on?: InputMaybe<Array<route_names_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<route_names_order_by>>
  where?: InputMaybe<route_names_bool_exp>
}

/** subscription root */
export type subscription_rootroute_names_by_pkArgs = {
  route_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootstockArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** subscription root */
export type subscription_rootstock_aggregateArgs = {
  distinct_on?: InputMaybe<Array<stock_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<stock_order_by>>
  where?: InputMaybe<stock_bool_exp>
}

/** subscription root */
export type subscription_rootstock_by_pkArgs = {
  company_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}

/** subscription root */
export type subscription_roottelephonesArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** subscription root */
export type subscription_roottelephones_aggregateArgs = {
  distinct_on?: InputMaybe<Array<telephones_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<telephones_order_by>>
  where?: InputMaybe<telephones_bool_exp>
}

/** subscription root */
export type subscription_roottelephones_by_pkArgs = {
  company_id: Scalars['String']['input']
  owner_id: Scalars['String']['input']
  telephone_number: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootusersArgs = {
  distinct_on?: InputMaybe<Array<users_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<users_order_by>>
  where?: InputMaybe<users_bool_exp>
}

/** subscription root */
export type subscription_rootusers_aggregateArgs = {
  distinct_on?: InputMaybe<Array<users_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<users_order_by>>
  where?: InputMaybe<users_bool_exp>
}

/** subscription root */
export type subscription_rootusers_by_pkArgs = {
  id: Scalars['String']['input']
}

/** subscription root */
export type subscription_rootvehiclesArgs = {
  distinct_on?: InputMaybe<Array<vehicles_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<vehicles_order_by>>
  where?: InputMaybe<vehicles_bool_exp>
}

/** subscription root */
export type subscription_rootvehicles_aggregateArgs = {
  distinct_on?: InputMaybe<Array<vehicles_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<vehicles_order_by>>
  where?: InputMaybe<vehicles_bool_exp>
}

/** subscription root */
export type subscription_rootvehicles_by_pkArgs = {
  vehicle_id: Scalars['String']['input']
}

/** columns and relationships of "telephones" */
export type telephones = {
  /** An object relationship */
  company: companies
  company_id: Scalars['String']['output']
  contact_person?: Maybe<Scalars['String']['output']>
  /** An object relationship */
  customer: customers
  is_active: Scalars['Boolean']['output']
  owner_id: Scalars['String']['output']
  remarks?: Maybe<Scalars['String']['output']>
  telephone_id: Scalars['String']['output']
  telephone_number: Scalars['String']['output']
}

/** aggregated selection of "telephones" */
export type telephones_aggregate = {
  aggregate?: Maybe<telephones_aggregate_fields>
  nodes: Array<telephones>
}

/** aggregate fields of "telephones" */
export type telephones_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<telephones_max_fields>
  min?: Maybe<telephones_min_fields>
}

/** aggregate fields of "telephones" */
export type telephones_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<telephones_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "telephones" */
export type telephones_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<telephones_max_order_by>
  min?: InputMaybe<telephones_min_order_by>
}

/** input type for inserting array relation for remote table "telephones" */
export type telephones_arr_rel_insert_input = {
  data: Array<telephones_insert_input>
  on_conflict?: InputMaybe<telephones_on_conflict>
}

/** Boolean expression to filter rows from the table "telephones". All fields are combined with a logical 'AND'. */
export type telephones_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<telephones_bool_exp>>>
  _not?: InputMaybe<telephones_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<telephones_bool_exp>>>
  company?: InputMaybe<companies_bool_exp>
  company_id?: InputMaybe<String_comparison_exp>
  contact_person?: InputMaybe<String_comparison_exp>
  customer?: InputMaybe<customers_bool_exp>
  is_active?: InputMaybe<Boolean_comparison_exp>
  owner_id?: InputMaybe<String_comparison_exp>
  remarks?: InputMaybe<String_comparison_exp>
  telephone_id?: InputMaybe<String_comparison_exp>
  telephone_number?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "telephones" */
export type telephones_constraint =
  /** unique or primary key constraint */
  | 'telephones_pkey'
  /** unique or primary key constraint */
  | 'telephones_telephone_id_key'

/** input type for inserting data into table "telephones" */
export type telephones_insert_input = {
  company?: InputMaybe<companies_obj_rel_insert_input>
  company_id?: InputMaybe<Scalars['String']['input']>
  contact_person?: InputMaybe<Scalars['String']['input']>
  customer?: InputMaybe<customers_obj_rel_insert_input>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  owner_id?: InputMaybe<Scalars['String']['input']>
  remarks?: InputMaybe<Scalars['String']['input']>
  telephone_id?: InputMaybe<Scalars['String']['input']>
  telephone_number?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type telephones_max_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  contact_person?: Maybe<Scalars['String']['output']>
  owner_id?: Maybe<Scalars['String']['output']>
  remarks?: Maybe<Scalars['String']['output']>
  telephone_id?: Maybe<Scalars['String']['output']>
  telephone_number?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "telephones" */
export type telephones_max_order_by = {
  company_id?: InputMaybe<order_by>
  contact_person?: InputMaybe<order_by>
  owner_id?: InputMaybe<order_by>
  remarks?: InputMaybe<order_by>
  telephone_id?: InputMaybe<order_by>
  telephone_number?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type telephones_min_fields = {
  company_id?: Maybe<Scalars['String']['output']>
  contact_person?: Maybe<Scalars['String']['output']>
  owner_id?: Maybe<Scalars['String']['output']>
  remarks?: Maybe<Scalars['String']['output']>
  telephone_id?: Maybe<Scalars['String']['output']>
  telephone_number?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "telephones" */
export type telephones_min_order_by = {
  company_id?: InputMaybe<order_by>
  contact_person?: InputMaybe<order_by>
  owner_id?: InputMaybe<order_by>
  remarks?: InputMaybe<order_by>
  telephone_id?: InputMaybe<order_by>
  telephone_number?: InputMaybe<order_by>
}

/** response of any mutation on the table "telephones" */
export type telephones_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<telephones>
}

/** input type for inserting object relation for remote table "telephones" */
export type telephones_obj_rel_insert_input = {
  data: telephones_insert_input
  on_conflict?: InputMaybe<telephones_on_conflict>
}

/** on conflict condition type for table "telephones" */
export type telephones_on_conflict = {
  constraint: telephones_constraint
  update_columns: Array<telephones_update_column>
  where?: InputMaybe<telephones_bool_exp>
}

/** ordering options when selecting data from "telephones" */
export type telephones_order_by = {
  company?: InputMaybe<companies_order_by>
  company_id?: InputMaybe<order_by>
  contact_person?: InputMaybe<order_by>
  customer?: InputMaybe<customers_order_by>
  is_active?: InputMaybe<order_by>
  owner_id?: InputMaybe<order_by>
  remarks?: InputMaybe<order_by>
  telephone_id?: InputMaybe<order_by>
  telephone_number?: InputMaybe<order_by>
}

/** select columns of table "telephones" */
export type telephones_select_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'contact_person'
  /** column name */
  | 'is_active'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'remarks'
  /** column name */
  | 'telephone_id'
  /** column name */
  | 'telephone_number'

/** input type for updating data in table "telephones" */
export type telephones_set_input = {
  company_id?: InputMaybe<Scalars['String']['input']>
  contact_person?: InputMaybe<Scalars['String']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  owner_id?: InputMaybe<Scalars['String']['input']>
  remarks?: InputMaybe<Scalars['String']['input']>
  telephone_id?: InputMaybe<Scalars['String']['input']>
  telephone_number?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "telephones" */
export type telephones_update_column =
  /** column name */
  | 'company_id'
  /** column name */
  | 'contact_person'
  /** column name */
  | 'is_active'
  /** column name */
  | 'owner_id'
  /** column name */
  | 'remarks'
  /** column name */
  | 'telephone_id'
  /** column name */
  | 'telephone_number'

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type timestamptz_comparison_exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>
  _gt?: InputMaybe<Scalars['timestamptz']['input']>
  _gte?: InputMaybe<Scalars['timestamptz']['input']>
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['timestamptz']['input']>
  _lte?: InputMaybe<Scalars['timestamptz']['input']>
  _neq?: InputMaybe<Scalars['timestamptz']['input']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>
}

/** expression to compare columns of type timetz. All fields are combined with logical 'AND'. */
export type timetz_comparison_exp = {
  _eq?: InputMaybe<Scalars['timetz']['input']>
  _gt?: InputMaybe<Scalars['timetz']['input']>
  _gte?: InputMaybe<Scalars['timetz']['input']>
  _in?: InputMaybe<Array<Scalars['timetz']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['timetz']['input']>
  _lte?: InputMaybe<Scalars['timetz']['input']>
  _neq?: InputMaybe<Scalars['timetz']['input']>
  _nin?: InputMaybe<Array<Scalars['timetz']['input']>>
}

/** columns and relationships of "users" */
export type users = {
  created_at: Scalars['timestamptz']['output']
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  last_seen: Scalars['String']['output']
  name: Scalars['String']['output']
}

/** aggregated selection of "users" */
export type users_aggregate = {
  aggregate?: Maybe<users_aggregate_fields>
  nodes: Array<users>
}

/** aggregate fields of "users" */
export type users_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<users_max_fields>
  min?: Maybe<users_min_fields>
}

/** aggregate fields of "users" */
export type users_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<users_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "users" */
export type users_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<users_max_order_by>
  min?: InputMaybe<users_min_order_by>
}

/** input type for inserting array relation for remote table "users" */
export type users_arr_rel_insert_input = {
  data: Array<users_insert_input>
  on_conflict?: InputMaybe<users_on_conflict>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type users_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<users_bool_exp>>>
  _not?: InputMaybe<users_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<users_bool_exp>>>
  created_at?: InputMaybe<timestamptz_comparison_exp>
  email?: InputMaybe<String_comparison_exp>
  id?: InputMaybe<String_comparison_exp>
  last_seen?: InputMaybe<String_comparison_exp>
  name?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "users" */
export type users_constraint =
  /** unique or primary key constraint */
  | 'users_email_key'
  /** unique or primary key constraint */
  | 'users_pkey'

/** input type for inserting data into table "users" */
export type users_insert_input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  last_seen?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type users_max_fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  last_seen?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "users" */
export type users_max_order_by = {
  created_at?: InputMaybe<order_by>
  email?: InputMaybe<order_by>
  id?: InputMaybe<order_by>
  last_seen?: InputMaybe<order_by>
  name?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type users_min_fields = {
  created_at?: Maybe<Scalars['timestamptz']['output']>
  email?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  last_seen?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "users" */
export type users_min_order_by = {
  created_at?: InputMaybe<order_by>
  email?: InputMaybe<order_by>
  id?: InputMaybe<order_by>
  last_seen?: InputMaybe<order_by>
  name?: InputMaybe<order_by>
}

/** response of any mutation on the table "users" */
export type users_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<users>
}

/** input type for inserting object relation for remote table "users" */
export type users_obj_rel_insert_input = {
  data: users_insert_input
  on_conflict?: InputMaybe<users_on_conflict>
}

/** on conflict condition type for table "users" */
export type users_on_conflict = {
  constraint: users_constraint
  update_columns: Array<users_update_column>
  where?: InputMaybe<users_bool_exp>
}

/** ordering options when selecting data from "users" */
export type users_order_by = {
  created_at?: InputMaybe<order_by>
  email?: InputMaybe<order_by>
  id?: InputMaybe<order_by>
  last_seen?: InputMaybe<order_by>
  name?: InputMaybe<order_by>
}

/** select columns of table "users" */
export type users_select_column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'last_seen'
  /** column name */
  | 'name'

/** input type for updating data in table "users" */
export type users_set_input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['String']['input']>
  last_seen?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "users" */
export type users_update_column =
  /** column name */
  | 'created_at'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'last_seen'
  /** column name */
  | 'name'

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type uuid_comparison_exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>
  _gt?: InputMaybe<Scalars['uuid']['input']>
  _gte?: InputMaybe<Scalars['uuid']['input']>
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>
  _is_null?: InputMaybe<Scalars['Boolean']['input']>
  _lt?: InputMaybe<Scalars['uuid']['input']>
  _lte?: InputMaybe<Scalars['uuid']['input']>
  _neq?: InputMaybe<Scalars['uuid']['input']>
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>
}

/** columns and relationships of "vehicles" */
export type vehicles = {
  /** An array relationship */
  deliveries: Array<deliveries>
  /** An aggregated array relationship */
  deliveries_aggregate: deliveries_aggregate
  is_active: Scalars['Boolean']['output']
  vehicle_brand: Scalars['String']['output']
  vehicle_id: Scalars['String']['output']
}

/** columns and relationships of "vehicles" */
export type vehiclesdeliveriesArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** columns and relationships of "vehicles" */
export type vehiclesdeliveries_aggregateArgs = {
  distinct_on?: InputMaybe<Array<deliveries_select_column>>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  order_by?: InputMaybe<Array<deliveries_order_by>>
  where?: InputMaybe<deliveries_bool_exp>
}

/** aggregated selection of "vehicles" */
export type vehicles_aggregate = {
  aggregate?: Maybe<vehicles_aggregate_fields>
  nodes: Array<vehicles>
}

/** aggregate fields of "vehicles" */
export type vehicles_aggregate_fields = {
  count?: Maybe<Scalars['Int']['output']>
  max?: Maybe<vehicles_max_fields>
  min?: Maybe<vehicles_min_fields>
}

/** aggregate fields of "vehicles" */
export type vehicles_aggregate_fieldscountArgs = {
  columns?: InputMaybe<Array<vehicles_select_column>>
  distinct?: InputMaybe<Scalars['Boolean']['input']>
}

/** order by aggregate values of table "vehicles" */
export type vehicles_aggregate_order_by = {
  count?: InputMaybe<order_by>
  max?: InputMaybe<vehicles_max_order_by>
  min?: InputMaybe<vehicles_min_order_by>
}

/** input type for inserting array relation for remote table "vehicles" */
export type vehicles_arr_rel_insert_input = {
  data: Array<vehicles_insert_input>
  on_conflict?: InputMaybe<vehicles_on_conflict>
}

/** Boolean expression to filter rows from the table "vehicles". All fields are combined with a logical 'AND'. */
export type vehicles_bool_exp = {
  _and?: InputMaybe<Array<InputMaybe<vehicles_bool_exp>>>
  _not?: InputMaybe<vehicles_bool_exp>
  _or?: InputMaybe<Array<InputMaybe<vehicles_bool_exp>>>
  deliveries?: InputMaybe<deliveries_bool_exp>
  is_active?: InputMaybe<Boolean_comparison_exp>
  vehicle_brand?: InputMaybe<String_comparison_exp>
  vehicle_id?: InputMaybe<String_comparison_exp>
}

/** unique or primary key constraints on table "vehicles" */
export type vehicles_constraint =
  /** unique or primary key constraint */
  'vehicles_pkey'

/** input type for inserting data into table "vehicles" */
export type vehicles_insert_input = {
  deliveries?: InputMaybe<deliveries_arr_rel_insert_input>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  vehicle_brand?: InputMaybe<Scalars['String']['input']>
  vehicle_id?: InputMaybe<Scalars['String']['input']>
}

/** aggregate max on columns */
export type vehicles_max_fields = {
  vehicle_brand?: Maybe<Scalars['String']['output']>
  vehicle_id?: Maybe<Scalars['String']['output']>
}

/** order by max() on columns of table "vehicles" */
export type vehicles_max_order_by = {
  vehicle_brand?: InputMaybe<order_by>
  vehicle_id?: InputMaybe<order_by>
}

/** aggregate min on columns */
export type vehicles_min_fields = {
  vehicle_brand?: Maybe<Scalars['String']['output']>
  vehicle_id?: Maybe<Scalars['String']['output']>
}

/** order by min() on columns of table "vehicles" */
export type vehicles_min_order_by = {
  vehicle_brand?: InputMaybe<order_by>
  vehicle_id?: InputMaybe<order_by>
}

/** response of any mutation on the table "vehicles" */
export type vehicles_mutation_response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']['output']
  /** data of the affected rows by the mutation */
  returning: Array<vehicles>
}

/** input type for inserting object relation for remote table "vehicles" */
export type vehicles_obj_rel_insert_input = {
  data: vehicles_insert_input
  on_conflict?: InputMaybe<vehicles_on_conflict>
}

/** on conflict condition type for table "vehicles" */
export type vehicles_on_conflict = {
  constraint: vehicles_constraint
  update_columns: Array<vehicles_update_column>
  where?: InputMaybe<vehicles_bool_exp>
}

/** ordering options when selecting data from "vehicles" */
export type vehicles_order_by = {
  deliveries_aggregate?: InputMaybe<deliveries_aggregate_order_by>
  is_active?: InputMaybe<order_by>
  vehicle_brand?: InputMaybe<order_by>
  vehicle_id?: InputMaybe<order_by>
}

/** select columns of table "vehicles" */
export type vehicles_select_column =
  /** column name */
  | 'is_active'
  /** column name */
  | 'vehicle_brand'
  /** column name */
  | 'vehicle_id'

/** input type for updating data in table "vehicles" */
export type vehicles_set_input = {
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  vehicle_brand?: InputMaybe<Scalars['String']['input']>
  vehicle_id?: InputMaybe<Scalars['String']['input']>
}

/** update columns of table "vehicles" */
export type vehicles_update_column =
  /** column name */
  | 'is_active'
  /** column name */
  | 'vehicle_brand'
  /** column name */
  | 'vehicle_id'

export type GetCategoriesQueryQueryVariables = Exact<{
  company_id: Scalars['String']['input']
}>

export type GetCategoriesQueryQuery = {
  _type_stock_groups: Array<{
    stock_groups: string
    our_company: string
    image_url: string
    alt_text: string
  }>
}

export type GetProductPricesQueryQueryVariables = Exact<{
  company_id: Scalars['String']['input']
  customer_id: Scalars['String']['input']
  stock_id: Scalars['String']['input']
}>

export type GetProductPricesQueryQuery = {
  stock: Array<{
    stock_price: number
    stock_price_a: number
    stock_price_b: number
    stock_price_c: number
    stock_price_d: number
    stock_price_s: number
    stock_price_hra: number
    stock_price_hrb: number
    stock_price_hrc: number
    stock_price_hrd: number
    stock_price_z: number
    campaign_price?: number | null
    is_campaign_active: boolean
  }>
  customer_price_list: Array<{ customers_price: number }>
  customers: Array<{ customer_price_class: string }>
}

export type GetProductsListWithPriceQueryQueryVariables = Exact<{
  company_id: Scalars['String']['input']
}>

export type GetProductsListWithPriceQueryQuery = {
  stock: Array<{
    stock_group: string
    stock_id: string
    stock_name: string
    stock_unit: string
    stock_price: number
  }>
}

export type GetProductsWithPriceListByCategryQueryQueryVariables = Exact<{
  company_id: Scalars['String']['input']
  stock_groups: Scalars['String']['input']
}>

export type GetProductsWithPriceListByCategryQueryQuery = {
  stock: Array<{
    stock_id: string
    stock_name: string
    stock_unit: string
    stock_price: number
    stock_group: string
  }>
  stock_aggregate: { aggregate?: { count?: number | null } | null }
}

export const GetCategoriesQueryDocument = gql`
  query GetCategoriesQuery($company_id: String!) {
    _type_stock_groups(
      order_by: { stock_groups: asc }
      where: { our_company: { _eq: $company_id }, willBeListed: { _eq: true } }
    ) {
      stock_groups
      our_company
      image_url
      alt_text
    }
  }
`

export function useGetCategoriesQueryQuery(
  options: Omit<Urql.UseQueryArgs<GetCategoriesQueryQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    GetCategoriesQueryQuery,
    GetCategoriesQueryQueryVariables
  >({ query: GetCategoriesQueryDocument, ...options })
}
export const GetProductPricesQueryDocument = gql`
  query GetProductPricesQuery(
    $company_id: String!
    $customer_id: String!
    $stock_id: String!
  ) {
    stock(
      where: {
        _and: { company_id: { _eq: $company_id }, stock_id: { _eq: $stock_id } }
      }
    ) {
      stock_price
      stock_price_a
      stock_price_b
      stock_price_c
      stock_price_d
      stock_price_s
      stock_price_hra
      stock_price_hrb
      stock_price_hrc
      stock_price_hrd
      stock_price_z
      campaign_price
      is_campaign_active
    }
    customer_price_list(
      where: {
        _and: {
          company_id: { _eq: $company_id }
          customer_id: { _eq: $customer_id }
          stock_id: { _eq: $stock_id }
        }
      }
    ) {
      customers_price
    }
    customers(
      where: {
        _and: {
          company_id: { _eq: $company_id }
          customer_id: { _eq: $customer_id }
        }
      }
    ) {
      customer_price_class
    }
  }
`

export function useGetProductPricesQueryQuery(
  options: Omit<Urql.UseQueryArgs<GetProductPricesQueryQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    GetProductPricesQueryQuery,
    GetProductPricesQueryQueryVariables
  >({ query: GetProductPricesQueryDocument, ...options })
}
export const GetProductsListWithPriceQueryDocument = gql`
  query GetProductsListWithPriceQuery($company_id: String!) {
    stock(
      where: {
        company_id: { _eq: $company_id }
        stock_is_active: { _eq: true }
        _rel_type_stock_group: { willBeListed: { _eq: true } }
      }
      order_by: { stock_group: asc }
    ) {
      stock_group
      stock_id
      stock_name
      stock_unit
      stock_price
    }
  }
`

export function useGetProductsListWithPriceQueryQuery(
  options: Omit<
    Urql.UseQueryArgs<GetProductsListWithPriceQueryQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetProductsListWithPriceQueryQuery,
    GetProductsListWithPriceQueryQueryVariables
  >({ query: GetProductsListWithPriceQueryDocument, ...options })
}
export const GetProductsWithPriceListByCategryQueryDocument = gql`
  query GetProductsWithPriceListByCategryQuery(
    $company_id: String!
    $stock_groups: String!
  ) {
    stock(
      where: {
        company_id: { _eq: $company_id }
        stock_is_active: { _eq: true }
        _rel_type_stock_group: {
          willBeListed: { _eq: true }
          stock_groups: { _eq: $stock_groups }
        }
      }
      order_by: { stock_group: asc, stock_id: asc }
    ) {
      stock_id
      stock_name
      stock_unit
      stock_price
      stock_group
    }
    stock_aggregate(where: { company_id: { _eq: $company_id } }) {
      aggregate {
        count(columns: stock_id)
      }
    }
  }
`

export function useGetProductsWithPriceListByCategryQueryQuery(
  options: Omit<
    Urql.UseQueryArgs<GetProductsWithPriceListByCategryQueryQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    GetProductsWithPriceListByCategryQueryQuery,
    GetProductsWithPriceListByCategryQueryQueryVariables
  >({ query: GetProductsWithPriceListByCategryQueryDocument, ...options })
}
