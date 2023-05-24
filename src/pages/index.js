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
  'I1HBSM55X2',
  'a424e354432ff6b7a1da7878bdddb134'
)

function IndexPage() {
  const [activeSearch, setActiveSearch] = useState(false)

  return (
    <InstantSearch indexName='Products' searchClient={searchClient}>
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

      <Configure analytics={true} clickAnalytics={true} hitsPerPage={6} />
      <SearchBox />

      <h1>Products index</h1>
      <Index indexName='Products'>
        <Hits hitComponent={Hit} />
      </Index>

      <h1>Recipes index</h1>
      <Index indexName='Recipes'>
        <Hits hitComponent={Hit} />
      </Index>
    </>
  )
}

function Hit({ hit }) {
  return JSON.stringify(hit)
}

export default IndexPage

export const Head = () => <title>Home Page</title>
