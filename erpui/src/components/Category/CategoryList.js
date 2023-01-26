import React, { useEffect, useState, useContext } from "react";
import { Table } from "antd";
import ErpContext from "../store/erp-context";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import { categoriesservices } from "../APIs/Services/CategoryServices";
import DeleteModal from "../UI/DeleteModal";

function CategoryList() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    categoriesservices.getAllCategories().then(({ data: categories }) => {
      setCategoryList(categories.data);
    });
  }, [deleteState]);

  const transFormedData = categoryList.map((el) =>
    el.isMain === true ? { ...el, Main: "Main" } : { ...el, Main: "Notmain" }
  );

  const deleteCategory = (id) => {
    categoriesservices.deleteCategory(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: categoryList.map((category) => {
        return { text: category.name, value: category.name };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "25%",
    },
    {
      title: "IsMain?",
      dataIndex: "Main",
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
          <Link to="/categories/update">
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
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
      {deleteState && <DeleteModal deleteItem={deleteCategory} />}
      <CategoryHeader />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={transFormedData}
      />
    </>
  );
}

export default CategoryList;
