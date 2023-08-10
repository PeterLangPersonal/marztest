import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import { Product, ProductData } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";
import { DragDropContext } from "react-beautiful-dnd";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR',
}

interface IdList {
  '0': string;
  '1': string;
}

const ID_LIST_MAP: IdList = {
  '0': 'Active',
  '1': 'Inactive'
};

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */
 
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({Active: [], Inactive: []} as ProductData);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    setLoadingState(DATA_STATES.loaded);
  };

  const updateProduct = async (product: Product) => {
    setLoadingState(DATA_STATES.waiting);
    setLoadingState(DATA_STATES.loaded);
  };

  const handleDragEnd = (result: any) => {

  }

  useEffect(() => {
    getProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
  );
  else if (loadingState === DATA_STATES.loaded) 
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="pipeline-container"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
        </DragDropContext>
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return (
    <PageWrapper>
      { content }
    </PageWrapper>
  );
};

export default ProductsPage
