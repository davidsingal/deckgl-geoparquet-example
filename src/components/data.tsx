import Head from 'next/head';
import { tableFromIPC } from 'apache-arrow';
import { readParquet } from 'parquet-wasm';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import IDBExportImport from 'indexeddb-export-import';

import { db } from '../db';

import type { Transaction } from 'dexie';

const fetchData = async () =>
  fetch('/data/foodscapes_filter_table_indexed.parquet')
    .then(async (res) => new Uint8Array(await res.arrayBuffer()))
    .then((data) => readParquet(data));

db.on('ready', () => {
  db.foodscapes.count().then(async (count) => {
    if (count > 0) {
      console.log('database already populated');
    } else {
      // await fetchData().then((data) => {});
      const idbDatabase = db.backendDB();
      console.log('populating dabase...');
      console.time('indexeddb import from json string');
      const data = await fetchData();
      const arrowTable = tableFromIPC(data);
      const parquetData = JSON.stringify({ foodscapes: JSON.parse(arrowTable.toString()) });
      IDBExportImport.importFromJsonString(idbDatabase, parquetData, (err) => {
        if (!err) {
          console.timeEnd('indexeddb import from json string');
        }
      });
      // await db.foodscapes.bulkAdd(parquetData);
    }
  });
});

export default function Data() {
  // const fetchParquet = useQuery(['parquet'], fetchData, {
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // });
  // const { data, isLoading, isFetched, error } = fetchParquet;

  const isEmpty = useLiveQuery(async () => {
    const listCount = await db.foodscapes.count();
    return listCount === 0;
  });
  const dataFiltered = useLiveQuery(
    () => db.foodscapes.where({ country: 'Argentina' }).toArray(),
    [],
  );

  console.log('is empty ', isEmpty);
  console.log('data filtered', dataFiltered);

  return <div className="w-full h-screen">Hello</div>;
}
