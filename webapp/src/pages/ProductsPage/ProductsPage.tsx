import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import { Product, ProductData } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";
import { DragDropContext } from "react-beautiful-dnd";
import { deleteProduct, getProductData, updateProductStatus } from "../ApiHelper";
import DraggableProductList from "../../components/DraggableProductList/DraggableProductList";

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
  '1': 'InActive'
};

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */
 
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({Active: [], InActive: []} as ProductData);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getProductData();
    setData(productData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  const updateProduct = async (product: Product) => {
    setLoadingState(DATA_STATES.waiting);
    const newProductStatus = product.ProductStatus === 'Active' ? 'Inactive' : 'Active';
    const productStatusUpdated = await updateProductStatus(product, newProductStatus);
    if (productStatusUpdated) {
      const columnKey = product.ProductStatus as keyof ProductData;
      setData({
        ...data,
        [columnKey]: data[columnKey].filter(
          (otherProduct: Product) => otherProduct.ProductID !== product.ProductID
        ),
      });
    }
    setLoadingState(DATA_STATES.loaded);
  };

  const removeProduct = async (product: Product) => {
    setLoadingState(DATA_STATES.waiting);
    const productDeleted = await deleteProduct(product);
    if (productDeleted) {
      const columnKey = product.ProductStatus as keyof ProductData;
      setData({
        ...data,
        [columnKey]: data[columnKey].filter(
          (otherProduct: Product) => otherProduct.ProductID !== product.ProductID
        ),
      });
    }
    setLoadingState(DATA_STATES.loaded);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceKey = ID_LIST_MAP[source.droppableId as keyof IdList] as keyof ProductData;
    const sourceIndex = source.index;

    const destKey = ID_LIST_MAP[destination.droppableId as keyof IdList] as keyof ProductData;
    const destIndex = destination.index;

    if (sourceKey === destKey) {
      const sourceClone = Array.from(data[sourceKey]);
      const [removed] = sourceClone.splice(sourceIndex, 1);
      sourceClone.splice(destIndex, 0, removed);
      setData({ ...data, [sourceKey]: sourceClone });
    }
    else {
        const sourceClone = Array.from(data[sourceKey]);
        const destClone = Array.from(data[destKey]);
        const [removed] = sourceClone.splice(sourceIndex, 1);
        destClone.splice(destIndex, 0, removed);
        destClone[destIndex].ProductStatus = destKey;
        setData({
          ...data,
          [sourceKey]: sourceClone,
          [destKey]: destClone,
        });
    }
  };

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
          <DraggableProductList
            ID='0'
            listTitle='Inactive'
            removeItem={(product: Product) => removeProduct(product)}
            items={data.InActive}
          />
          <DraggableProductList
            ID='1'
            listTitle='Active'
            removeItem={(product: Product) => removeProduct(product)}
            items={data.Active}
          />
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
