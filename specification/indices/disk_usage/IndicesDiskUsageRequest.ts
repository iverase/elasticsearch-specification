/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { RequestBase } from '@_types/Base'
import { ExpandWildcards, IndexName, Indices } from '@_types/common'
import { TimeUnit } from '@_types/Time'

/**
 * @rest_spec_name indices.disk_usage
 * @since 7.15.0
 * @stability experimental
 */
export interface Request extends RequestBase {
  path_parts: {
    /**
     * Comma-separated list of data streams, indices, and aliases used to limit the request. It’s recommended to execute this API with a single index (or the latest backing index of a data stream) as the API consumes resources significantly.
     */
    index: IndexName
  }
  query_parameters?: {
    /**
     * If false, the request returns an error if any wildcard expression, index alias, or _all value targets only missing or closed indices. This behavior applies even if the request targets other open indices. For example, a request targeting foo*,bar* returns an error if an index starts with foo but no index starts with bar.
     * @server_default true
     */
    allow_no_indices?: boolean
    /**
     * Type of index that wildcard patterns can match. If the request can target data streams, this argument determines whether wildcard expressions match hidden data streams. Supports comma-separated values, such as open,hidden.
     * @server_default open
     */
    expand_wildcards?: ExpandWildcards
    /**
     * If true, the API performs a flush before analysis. If false, the response may not include uncommitted data.
     * @server_default true
     */
    flush?: boolean
    /**
     * If true, missing or closed indices are not included in the response.
     * @server_default false
     */
    ignore_unavailable?: boolean
    /**
     * Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error.
     * @server_default 30s
     */
    master_timeout?: TimeUnit
    /**
     * Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error.
     * @server_default 30s
     */
    timeout?: TimeUnit
    /**
     * Analyzing field disk usage is resource-intensive. To use the API, this parameter must be set to true.
     * @server_default false
     */
    run_expensive_tasks?: boolean
    /**
     * The number of shard copies that must be active before proceeding with the operation. Set to all or any positive integer up to the total number of shards in the index (number_of_replicas+1). Default: 1, the primary shard.
     */
    wait_for_active_shards?: string
  }
}
