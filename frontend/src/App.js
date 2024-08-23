import React from "react";
import { useEffect,useState } from "react";
import {
  BrowserRouter,
  createRoutesFromChildren,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";



// backend 
import Sidebar from './adminComponent/Sidebar';
import ServicesBack from './adminComponent/Pages/Services';
import CreateService from "./adminComponent/Pages/CreateService";
import EditService from './adminComponent/Pages/EditService';
import ServiceCategory from "./adminComponent/Pages/Servicecategory"
import CreateServiceCategory from "./adminComponent/Pages/CreateServiceCategory"
import EditServiceCategory from "./adminComponent/Pages/EditServiceCategory"
import News from "./adminComponent/Pages/News";
import CreateNews from "./adminComponent/Pages/CreateNews";
import EditNews from './adminComponent/Pages/EditNews';
import NewsCategory from "./adminComponent/Pages/NewsCategory"
import CreateNewsCategory from "./adminComponent/Pages/CreateNewsCategory"
import EditNewsCategory from "./adminComponent/Pages/EditNewsCategory"
import Testimonials from './adminComponent/Pages/Testimonials';
import CreateTestimonials from './adminComponent/Pages/CreateTestimonials';
import EditTestimonials from './adminComponent/Pages/EditTestimonials';
import FAQ from "./adminComponent/Pages/FAQ";
import CreateFAQ from "./adminComponent/Pages/CreateFAQ";
import EditFAQ from './adminComponent/Pages/EditFAQ';
import OurStaff from "./adminComponent/Pages/Staff";
import CreateStaff from "./adminComponent/Pages/CreateStaff";
import EditStaff from './adminComponent/Pages/EditStaff';
import Banner from "./adminComponent/Pages/Banner";
import CreateBanner from "./adminComponent/Pages/CreateBanner";
import EditBanner from "./adminComponent/Pages/EditBanner";
import ProductCategory from "./adminComponent/Pages/ProductCategory";
import CreateProductCategory from "./adminComponent/Pages/CreateCategory";
import EditCategory from "./adminComponent/Pages/EditCategory";
import PageContent from "./adminComponent/Pages/PageContent";
import CreatePageContent from "./adminComponent/Pages/CreatePageContent";
import Product from "./adminComponent/Pages/Product";
import CreateProduct from "./adminComponent/Pages/CreateProduct";
import EditProduct from "./adminComponent/Pages/EditProduct";
import Partner from "./adminComponent/Pages/Partners";
import CreatePartner from "./adminComponent/Pages/CreatePartner";
import EditPartner from "./adminComponent/Pages/EditPartner";
import Dashboard from "./adminComponent/Pages/Dashboard";
import Signup from "./adminComponent/Adminsignup"
import Login from "./adminComponent/Adminlogin";
import VerifyOTP from "./adminComponent/VerifyOTP";
import ResetPassword from "./adminComponent/ResetPassword";
import EditPageContent from './adminComponent/Pages/EditPageContent';
import ForgetPassword from './adminComponent/ForgotPassword';
import DatabaseManagement from './adminComponent/Pages/DatabaseManagement';
import ManagePassword from "./adminComponent/Pages/ManagePassword";
import Logo from "./adminComponent/Pages/Logo";
import Cookies from "js-cookie";
import CreateAboutUsPoints from './adminComponent/Pages/CreateAboutuspoints';
import EditAboutUsPoints from './adminComponent/Pages/EditAboutuspoints';
import Achievements from "./adminComponent/Pages/Achievements"
import CreateAchievements from "./adminComponent/Pages/CreateAchievements"
import EditAchievement from './adminComponent/Pages/EditAchievements';
import Counter from "./adminComponent/Pages/Counter"
import EditCounter from "./adminComponent/Pages/EditCounter"
import CreateCounter from "./adminComponent/Pages/CreateCounter"
import GalleryCategory from "./adminComponent/Pages/GalleryCategory"
import EditGalleryCategory from "./adminComponent/Pages/EditGalleryCategory"
import CreateGalleryCategory from "./adminComponent/Pages/CreateGalleryCategory"
import Gallery from "./adminComponent/Pages/Gallery"
import CreateGallery from "./adminComponent/Pages/CreateGallery"
import EditGallery from "./adminComponent/Pages/EditGallery"
import Inquiry from "./adminComponent/Pages/Inquiry"
import Mission from "./adminComponent/Pages/Mission"
import Vision from "./adminComponent/Pages/Vision"
import Corevalue from "./adminComponent/Pages/Corevalue"
import CreateCorevalue from "./adminComponent/Pages/CreateCorevalue"
import EditCorevalue from "./adminComponent/Pages/EditCorevalue"
import Aboutcompany from './adminComponent/Pages/Aboutcompany';
import Careeroption from "./adminComponent/Pages/Careeroptions"
import CreateCareeroption from "./adminComponent/Pages/CreateCareeroption"
import EditCareeroption from "./adminComponent/Pages/EditCareeroption"
import Careerinquiry from "./adminComponent/Pages/Careerinquiry"
import Footer from "./adminComponent/Pages/Footer"
import Header from "./adminComponent/Pages/Header"
import Globalpresence from "./adminComponent/Pages/GlobalPresence"
import WhatsappSettings from "./adminComponent/Pages/WhatsappSettings"
import GoogleSettings from "./adminComponent/Pages/GoogleSettings"
import Menulisting from "./adminComponent/Pages/Menulisting"
import CreateMenulisting from "./adminComponent/Pages/CreateMenulisting"
import EditMenulisting from "./adminComponent/Pages/EditMenulisting"

import Sitemap from "./adminComponent/Pages/Sitemap"
import CreateSitemap from "./adminComponent/Pages/CreateSitemap"
import EditSitemap from "./adminComponent/Pages/EditSitemap"
import Metadetails from "./adminComponent/Pages/Metadetails"
import EditMetadetails from "./adminComponent/Pages/EditMetadetails"
import ManageProfile from "./adminComponent/Pages/ManageProfile"
import MissionAndVision from './adminComponent/Pages/MissionAndVision';
import Benefits from "./adminComponent/Pages/Benefits"
import CreateBenefits from "./adminComponent/Pages/CreateBenefits"
import EditBenefits from "./adminComponent/Pages/EditBenefits"
import ManageColor from "./adminComponent/Pages/ManageColor"
import CreateServiceDetails from "./adminComponent/Pages/CreateServiceDetails"
import EditServiceDetails from "./adminComponent/Pages/EditServicePage";
import CreateServiceImage from "./adminComponent/Pages/CreateServiceImage"
import EditServiceImages from "./adminComponent/Pages/EditServiceImages"


import Navbar from "./components/NavBar";
import Homepage from "./pages/Homepage";
import MainPage from "./pages/Mainpage";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import Templates from "./pages/Templates";
import WhatWeDo from "./pages/WhatWeDo";
import Website from "./pages/Website";
import AllReviews from "./components/WhatWeDo/AllReviews"
import ErrorBoundary from "./components/ErrorBound";
import HomeHerosection from "./adminComponent/Pages/HomeHerosection";
import Design from "./pages/Design"





import CreatePackage from "./adminComponent/Pages/CreatePackage"
import EditPackageForm from "./adminComponent/Pages/EditPackage";
import DesignProcessForm from "./adminComponent/Pages/CreateDesignProcess"

import EditDesignProcess from "./adminComponent/Pages/EditDesignProcess"

import EditWebSolutionDetails from "./adminComponent/Pages/WebSolution"
import SocialMedia from "./pages/SocialMedia";
import EditServicePage from "./adminComponent/Pages/EditEachCategory";
import HowItWorksTable from "./adminComponent/Pages/HowitWorks";
import AboutUs from "./pages/AboutUs";
import Collabration from "./pages/Collabration";
import GetInTouch from "./pages/Contact";
import Faq from "./pages/Faq";
import NewSubmenuListingForm from "./adminComponent/Pages/CreateSubMenu";
import EditSubmenuForm from "./adminComponent/Pages/EditSubMenu";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwt');
    console.log(token)
    if (token) {
      setIsLoggedIn(true);
    } else {
      console.log("User is not logged in");
    }
  }, []);

  return (
   
      <BrowserRouter>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/verifyOTP" element={<VerifyOTP />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/" element={<MainPage />}>
        <Route path="/" index element={<Homepage />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/design" element={<Design />} />

        <Route path="/websites" element={<Website />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/all-reviews" element={<AllReviews />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/collabration" element={<Collabration/>}/>
        <Route path="/contact" element={<GetInTouch/>}/>
        <Route path="/helpCenter" element={<Faq/>}/>
      </Route>

            </>



          ) : (
  
            <Route path="/" element={<Sidebar />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<ServicesBack />} />
            <Route path="/services/createServices" element={<CreateService />} />
            <Route path="/services/editServices/:slugs" element={<EditService />} />
            <Route path="/ServiceCategory" element={<ServiceCategory />} />
            <Route path="/ServiceCategory/CreateServiceCategory" element={<CreateServiceCategory />} />
            <Route path="/ServiceCategory/editServiceCategory/:categoryId/:subCategoryId?/:subSubCategoryId?" element={<EditServiceCategory />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/createNews" element={<CreateNews />} />
            <Route path="/news/editNews/:slugs" element={<EditNews />} />
            <Route path="/NewsCategory" element={<NewsCategory />} />
            <Route path="/NewsCategory/CreateNewsCategory" element={<CreateNewsCategory />} />
            <Route path="/NewsCategory/editNewsCategory/:categoryId/:subCategoryId?/:subSubCategoryId?" element={<EditNewsCategory />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/testimonials/createTestimonials" element={<CreateTestimonials />} />
            <Route path="/testimonials/editTestimonials/:id" element={<EditTestimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/faq/createFAQ" element={<CreateFAQ />} />
            <Route path="/faq/editFAQ/:id" element={<EditFAQ />} />
            <Route path="/ourTeam" element={<OurStaff />} />
            <Route path="/ourTeam/createTeam" element={<CreateStaff />} />
            <Route path="/ourTeam/editTeam/:id" element={<EditStaff />} />
            <Route path="/banner" element={<Banner />} />
            <Route path="/banner/createBanner" element={<CreateBanner />} />
            <Route path="/banner/editBanner/:id" element={<EditBanner />} />
            <Route path="/ProductCategory" element={<ProductCategory />} />
            <Route path="/ProductCategory/CreateProductCategory" element={<CreateProductCategory />} />
            <Route path="/ProductCategory/editProductCategory/:categoryId/:subCategoryId?/:subSubCategoryId?" element={<EditCategory />} />
            <Route path="/extrapages" element={<PageContent />} />
            <Route path="/extrapages/createextrapages" element={<CreatePageContent />} />
            <Route path="/extrapages/editextrapages/:id" element={<EditPageContent />} />
            <Route path="/pageContent/createPoints" element={<CreateAboutUsPoints />} />
            <Route path="/pageContent/editPoints/:id" element={<EditAboutUsPoints />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/createProduct" element={<CreateProduct />} />
            <Route path="/product/editProduct/:slugs" element={<EditProduct />} />
            <Route path="/clients" element={<Partner />} />
            <Route path="/clients/createClients" element={<CreatePartner />} />
            <Route path="/clients/editClients/:id" element={<EditPartner />} />
            <Route path="/manageLogo" element={<Logo />} />
            <Route path="/DatabaseManagement" element={<DatabaseManagement />} />
            <Route path="/managePassword" element={<ManagePassword />} />
            <Route path="/manageProfile" element={<ManageProfile />} />
            <Route path="/certificates" element={<Achievements />} />
            <Route path="/certificates/createcertificates" element={<CreateAchievements />} />
            <Route path="/certificates/editcertificates/:id" element={<EditAchievement />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/counter/editCounter/:id" element={<EditCounter />} />
            <Route path="/counter/createCounter" element={<CreateCounter />} />
            <Route path="/Inquiry" element={<Inquiry />} />
            <Route path="/GalleryCategory" element={<GalleryCategory />} />
            <Route path="/GalleryCategory/editGalleryCategory/:id" element={<EditGalleryCategory />} />
            <Route path="/GalleryCategory/CreateGalleryCategory" element={<CreateGalleryCategory />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/createGallery" element={<CreateGallery />} />
            <Route path="/gallery/EditGallery/:id" element={<EditGallery />} />
            {/* <Route path="/mission" element={<Mission />} />
          <Route path="/vision" element={<Vision />} />  */}
            <Route path="/missionandvision" element={<MissionAndVision />} />
            <Route path="/corevalue" element={<Corevalue />} />
            <Route path="/corevalue/createCorevalue" element={<CreateCorevalue />} />
            <Route path="/corevalue/editCorevalue/:id" element={<EditCorevalue />} />
            <Route path="/aboutcompany" element={<Aboutcompany />} />
            <Route path="/careeroption" element={<Careeroption />} />
            <Route path="/careeroption/createCareerOption" element={<CreateCareeroption />} />
            <Route path="/careeroption/editCareerOption/:id" element={<EditCareeroption />} />
            <Route path="/careerinquiry" element={<Careerinquiry />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/header" element={<Header />} />
            <Route path="/globalpresence" element={<Globalpresence />} />
            <Route path="/whatsappSettings" element={<WhatsappSettings />} />
            <Route path="/googleSettings" element={<GoogleSettings />} />
            <Route path="/menulisting" element={<Menulisting />} />
            <Route path="/menulisting/createMenulisting" element={<CreateMenulisting />} />
            <Route path="/menulisting/editMenulisting/:id" element={<EditMenulisting />} />
      
      
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/sitemap/createSitemap" element={<CreateSitemap />} />
            <Route path="/sitemap/editSitemap/:id/:type" element={<EditSitemap />} />
            <Route path="/metadetails" element={<Metadetails />} />
            <Route path="/metadetails/editmetaDetails/:id/:type" element={<EditMetadetails />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/benefits/createBenefits" element={<CreateBenefits />} />
            <Route path="/benefits/editBenefits/:id" element={<EditBenefits />} />
            <Route path="/manageTheme" element={<ManageColor />} />
      
      
      {/* made for me  */}
      
      <Route path="/homehero" element={<HomeHerosection/>}/>
      <Route path="/services/createService/:categoryId" element={<CreateServiceDetails/>}/>
      <Route path="/services/edit-service/:categoryId" element={<EditServicePage/>}/>
      <Route path="/services/EditService/:categoryId" element={<EditServiceDetails/>}/>
      <Route path="/services/createImage/:categoryId" element={<CreateServiceImage />} />
      <Route path="/services/editImages/:categoryId" element={<EditServiceImages/>}/>
      <Route path="/services/createPackage/:categoryId" element={<CreatePackage/>}/>
      <Route path="/services/packages/:packageId" element={<EditPackageForm/>}/>
      <Route path="/services/designProcess/:categoryId" element={<DesignProcessForm/>}/>
      <Route path="/services/editDesignProcess/:processId" element={<EditDesignProcess />} />
      <Route path="/extrapages/:contentType" element={<EditWebSolutionDetails/>}/>
      <Route path="/howworks" element={<HowItWorksTable/>}/>



      <Route path="/menulisting/createSubmenu" element={<NewSubmenuListingForm/>}/>
      <Route path="/menulisting/editSubmenu/:id" element={<EditSubmenuForm/>}/>
          </Route>
      
          )}
        </Routes>
      </BrowserRouter>
 

  );
}

export default App;
