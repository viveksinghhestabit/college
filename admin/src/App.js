import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import LoginPage from "./components/LoginPage";
import NavSidebar from "./components/NavSidebar";
import ArtistPage from "./components/Artists/ArtistPage";
import UserPage from "./components/Users/UserPage";
import AddArtistForm from "./components/Artists/AddArtistForm";
import BlogPage from "./components/Blogs/BlogPage";
import AddBlogForm from "./components/Blogs/AddBlogForm";
import Addcoursepage from "./components/Artists/Addcoursepage";
import ViewCoursePage from "./components/Artists/Courses/ViewCoursePage";
import Edituniversity from "./components/Artists/University/Edituniversity";
import Editcourse from "./components/Artists/Courses/Editcourse";
import EditBlog from "./components/Blogs/allblogs/EditBlog";
import ViewSingleUser from "./components/Users/ViewSingleUser";
import College from "./components/colleges/college";
import AddCollege from "./components/colleges/AddCollege";
import EnquiryPage from "./components/EnquiryForm/EnquiryPage";
import Course from "./components/colleges/course/Course";
import AddCourse from "./components/colleges/course/AddCourse";
import Testimonial from "./components/Testimonials/Testimonial";
import AddTestimonial from "./components/Testimonials/AddTestimonial";
import Review from "./components/colleges/Review/Review";
import Gallery from "./components/Gallery/Gallery";
import AddGallery from "./components/Gallery/AddGallery";
import Showcase from "./components/Showcase/Showcase";
import DynamicTables from "./components/DynamicTables/DynamicTablex";
import AddDynamicTable from "./components/DynamicTables/AddDynamicTable";
import Subpage from "./components/Subpage/Subpage";
import AddSubpage from "./components/Subpage/AddSubpage";
import StatePage from "./components/States/StatePage";
import AddStateForm from "./components/States/AddStateForm";
import AddShowcaseForm from "./components/Showcase/AddShowcase";

export const history = createHistory();
const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <NavSidebar>
          {/* Universities */}

          <Route path="/universities" exact component={ArtistPage} />
          <Route path="/universities/add" exact component={AddArtistForm} />
          <Route
            path="/universities/edit/:id"
            exact
            component={AddArtistForm}
          />
          <Route
            path="/universities/addcourse/:id"
            exact
            component={Addcoursepage}
          />
          <Route
            path="/universities/viewcourse/:id"
            exact
            component={ViewCoursePage}
          />
          <Route
            path="/universities/editcourse/:id1/:id2"
            exact
            component={Editcourse}
          />
          <Route path="/states" exact component={StatePage} />
          <Route path="/states/add" exact component={AddStateForm} />
          <Route path="/states/edit/:id" exact component={AddStateForm} />
          <Route path="/blogs" exact component={BlogPage} />
          <Route path="/blog/add" exact component={AddBlogForm} />
          <Route path="/blog/edit/:id" exact component={AddBlogForm} />
          <Route path="/colleges" exact component={College} />
          <Route path="/colleges/:id/course" exact component={Course} />
          <Route path="/colleges/:id/review" exact component={Review} />
          <Route path="/colleges/:id/course/add" exact component={AddCourse} />
          <Route path="/colleges/edit/:id" exact component={AddCollege} />
          <Route path="/colleges/add" exact component={AddCollege} />
          <Route path="/users" exact component={UserPage} />
          <Route path="/enquiry" exact component={EnquiryPage} />
          <Route path="/users/:id" exact component={ViewSingleUser} />
          <Route path="/testimonial" exact component={Testimonial} />
          <Route path="/testimonial/add" exact component={AddTestimonial} />
          <Route
            path="/testimonial/edit/:id"
            exact
            component={AddTestimonial}
          />

          {/* <Route path="/gallery" exact component={Gallery} />
          <Route path="/gallery/add" exact component={AddGallery} /> */}
          <Route path="/home-showcase" exact component={Showcase} />
          <Route path="/home-showcase/add" exact component={AddShowcaseForm} />
          <Route
            path="/home-showcase/edit/:id"
            exact
            component={AddShowcaseForm}
          />
          <Route path="/colleges/:id/table" exact component={DynamicTables} />
          <Route
            path="/colleges/:id/table/add"
            exact
            component={AddDynamicTable}
          />
          <Route
            path="/colleges/:id/edit/:tableid"
            exact
            component={AddDynamicTable}
          />
          <Route path="/subpage" exact component={Subpage} />
          <Route path="/subpage/add" exact component={AddSubpage} />
          <Route path="/subpage/edit/:id" exact component={AddSubpage} />
        </NavSidebar>
      </Switch>
    </Router>
  );
};

export default App;
