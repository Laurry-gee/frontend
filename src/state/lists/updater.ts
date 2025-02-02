import { getVersionUpgrade, minVersionBump, VersionUpgrade } from '@uniswap/token-lists'
import { useWeb3React } from '@web3-react/core'
import { UNSUPPORTED_LIST_URLS } from 'config/constants/lists'
import useInterval from 'lib/hooks/useInterval'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from 'state/hooks'
import { useAllLists } from 'state/lists/hooks/hooks'

import { useFetchListCallback } from '../../hooks/useFetchListCallback'
import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { acceptListUpdate } from './actions'

export default function Updater(): null {
  //TODO: this updater might not be necessary, revisit this
  const { provider } = useWeb3React()
  const dispatch = useAppDispatch()
  const isWindowVisible = useIsWindowVisible()

  // get all loaded lists, and the active urls
  const lists = useAllLists()
  const fetchList = useFetchListCallback()
  const fetchAllListsCallback = useCallback(() => {
    if (!isWindowVisible) return
    Object.keys(lists).forEach((url) => {
      // Skip validation on unsupported lists
      const isUnsupportedList = UNSUPPORTED_LIST_URLS.includes(url)
      fetchList(url, true, isUnsupportedList).catch((error: any) =>
        console.debug('interval list fetching error', error),
      )
    })
    // Removed list to stop loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchList, isWindowVisible])

  // fetch all lists every 10 minutes, but only after we initialize provider
  useInterval(fetchAllListsCallback, provider ? 1000 * 60 * 10 : null)

  // whenever a list is not loaded and not loading, try again to load it
  useEffect(() => {
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl]
      if (!list.current && !list.loadingRequestId && !list.error) {
        fetchList(listUrl).catch((error: any) => console.debug('list added fetching error', error))
      }
    })
  }, [dispatch, fetchList, lists])

  // if any lists from unsupported lists are loaded, check them too (in case new updates since last visit)
  useEffect(() => {
    UNSUPPORTED_LIST_URLS.forEach((listUrl) => {
      const list = lists[listUrl]
      if (!list || (!list.current && !list.loadingRequestId && !list.error)) {
        fetchList(listUrl, undefined, true).catch((error: any) => console.debug('list added fetching error', error))
      }
    })
  }, [dispatch, fetchList, lists])

  // automatically update lists if versions are minor/patch
  useEffect(() => {
    Object.keys(lists).forEach((listUrl) => {
      const list = lists[listUrl]
      if (list.current && list.pendingUpdate) {
        const bump = getVersionUpgrade(list.current.version, list.pendingUpdate.version)
        switch (bump) {
          case VersionUpgrade.NONE:
            throw new Error('unexpected no version bump')
          case VersionUpgrade.PATCH:
          case VersionUpgrade.MINOR: {
            const min = minVersionBump(list.current.tokens, list.pendingUpdate.tokens)
            // automatically update minor/patch as long as bump matches the min update
            if (bump >= min) {
              dispatch(acceptListUpdate(listUrl))
            } else {
              console.error(
                `List at url ${listUrl} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`,
              )
            }
            break
          }
          // update any active or inactive lists
          case VersionUpgrade.MAJOR:
            dispatch(acceptListUpdate(listUrl))
        }
      }
    })
  }, [dispatch, lists])

  return null
}
