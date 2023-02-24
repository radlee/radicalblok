import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { toast } from "react-hot-toast";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllBlogs } from "../../apicalls/blogs";
import Blog from "./Blog";
import { Grid, Cell } from 'react-mdl';
import { Pagination } from 'antd';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [total, setTotal] = useState("");
  const [page, setPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(6);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBlogs();
      if (response.success) {
        setBlogs(response.data);
        setTotal(response.data.length)
      } else {
        toast.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastPage = page * blogsPerPage;
  const indexOfFirstPage = indexOfLastPage - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPage, indexOfLastPage);

  const onShowSizeChange = (current, pageSize) => {
    setBlogsPerPage(pageSize);
  }

  const itemRender = (current, type, originalElement) => {
    if(type === 'prev') {
      return <a>Previous</a>
    }
    if(type === 'next') {
      return <a>Next</a>
    }

    return originalElement;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-primary text-1xl font-bold">
          Welcome {currentUser.name} !
        </h1>
      </div>

      <div style={{width: '50%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={6}>
            <img src={process.env.PUBLIC_URL + 'radblok.gif'} />
          </Cell>
        </Grid>
      </div>

      <Button
          title="Add Blog"
          variant="primary-outlined"
          onClick={() => navigate("/add-blog")}
        />

      <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-5 mt-5 sm:grid-cols-1 xs:grid-cols-1">
        {currentBlogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </div>
      <hr />
      <br />
      <Pagination 
        onChange={(value) => setPage(value)}
        pageSize={blogsPerPage}
        total={total}
        current={page}
        showSizeChanger
        showQuickJumper
        onShowSizeChange={onShowSizeChange}
        itemRender={itemRender}
      />
      <br />
      <hr />
    </div>
  );
}

export default Home;
