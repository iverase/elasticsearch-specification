@rest_spec_name("cat.aliases")
class CatAliasesRequest extends CatRequestBase {
  path_parts?: {
    name?: string | string[];
  }
  query_parameters?: {
    expand_wildcards?: ExpandWildcards;
  }
  body?: {
  }
}
