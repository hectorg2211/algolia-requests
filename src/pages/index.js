import React, { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Index,
  Configure,
} from 'react-instantsearch-hooks-web'

const searchClient = algoliasearch(
  'SV12BSVNSA',
  '120f0ba56d4c007e710cba41d3fe654f'
)

let timerId = undefined

function IndexPage() {
  const [activeSearch, setActiveSearch] = useState(false)

  return (
    <InstantSearch indexName='normal_recipes' searchClient={searchClient}>
      <Configure analytics={true} clickAnalytics={true} hitsPerPage={6} />

      <SearchItems
        activeSearch={activeSearch}
        setActiveSearch={setActiveSearch}
      />
    </InstantSearch>
  )
}

function SearchItems({ activeSearch, setActiveSearch }) {
  if (!activeSearch) {
    return (
      <button onClick={() => setActiveSearch(!activeSearch)}>
        Show search results
      </button>
    )
  }

  return (
    <>
      <button onClick={() => setActiveSearch(!activeSearch)}>
        Hide search results
      </button>

      <SearchBox queryHook={queryHook} />

      <h1>Products index</h1>
      <Index indexName='products_v2'>
        <Hits hitComponent={Hit} />
      </Index>

      <h1>Recipes index</h1>
      <Index indexName='normal_recipes'>
        <Hits hitComponent={Hit} />
      </Index>

      <h1>Blog posts</h1>
      <Index indexName='blog_posts'>
        <Hits hitComponent={Hit} />
      </Index>
    </>
  )
}

function Hit({ hit }) {
  return JSON.stringify(hit)
}

function queryHook(query, search) {
  if (timerId) {
    clearTimeout(timerId)
  }

  timerId = setTimeout(() => search(query), 500)
}

export default IndexPage

export const Head = () => <title>Home Page</title>
