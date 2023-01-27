import React, {useEffect, useContext, useState} from 'react'
import ErpContext from '../store/erp-context';
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import BrandHeader from './BrandHeader';
import { brandservices } from '../APIs/Services/BrandsService';
import DeleteModal from '../UI/DeleteModal';
import Loading from '../UI/Loading';

function BrandsList() {
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
    useContext(ErpContext);
  const [brandList, setBrandlist] = useState([]);

  useEffect(() => {
    brandservices.getAllBrands().then(({ data: brands }) => {
      setBrandlist(brands.data);
    }).finally(setLoading(false));
  }, [loading, setLoading]);

  const deleteBrand = (id) => {
    brandservices.deleteBrand(id).then((data) => {
      setLoading(true)
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

      const columns = [
        {
          title: "Brand",
          dataIndex: "brandName",
          filters: brandList.map((brand) => {
            return { text: brand.brandName, value: brand.brandName };
          }),
          filterSearch: true,
          onFilter: (value, record) => record.brandName.startsWith(value),
          width: "25%",       
        },       
              
        {
          title: "Actions",         
          dataIndex: "",
          key: "x",
          render: (record) => (
            <div className="d-flex ">
              <Button
                id={record.id}
                onClick={() => {
                  deleteMOdalHandling(record.id);
                }}
                className="margin "
                variant="danger"
              >
                Delete
              </Button>
              <Link to='/brands/update'>
                <Button
                  id={record.id}
                  onClick={() => {
                    setId(record.id)
                  }}
                  variant="primary"
                >
                  Edit
                </Button>
              </Link>              
            </div>
          ),
        },
      ];
         
    
      return (
        <> 
        {loading && <Loading/>}
        {deleteState && <DeleteModal deleteItem={deleteBrand} />}
        <BrandHeader/> 
          <Table  rowKey={(record) => record.id} columns={columns} dataSource={brandList} />
        </>
      );
}

export default BrandsList