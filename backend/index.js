const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serveStatic = require('serve-static');
const path = require('path');
const cron = require('node-cron');
const {exportAndBackupAllCollectionsmonthly} = require("./controller/Backup")
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Import routes
const productRoute = require('./routes/product');
const servicesRoute = require('./routes/services');
const newsRoute = require('./routes/news');
const pageHeadingRoute = require('./routes/pageHeading');
const imagesRoute = require('./routes/image');
const testimonialRoute = require('./routes/testinomial');
const faq = require('./routes/FAQ');
const ourStaff = require('./routes/ourStaff');
const banner = require('./routes/Banner');
const pageContent = require('./routes/pageContent');
const galleryImage = require('./routes/galleryImage');
const adminRoutes = require('./routes/admin');
const forgotPassword=require('./routes/forgotpassword')
const emailRoutes = require('./routes/email');
const partnerRoutes = require('./routes/partners');
const logoRoutes=require("./routes/logo")
const BackupRoutes=require("./routes/backup")
const AboutUsPoints=require("./routes/aboutuspoints")
const Achievements=require("./routes/achievements")
const Counter = require("./routes/counter")
const inquiries=require("./routes/inquiry")
const mission=require("./routes/mission")
const vision=require("./routes/vision")
const corevalue=require("./routes/corevalue")
const aboutcompany=require("./routes/aboutcompany")
const careeroption=require("./routes/careeroption")
const careerinquiry=require("./routes/careerinquiry")
const footer=require("./routes/footer")
const header=require("./routes/header")
const globalpresence=require("./routes/globalpresence")
const whatsappsettings=require('./routes/whatsappsettings')
const googlesettings=require("./routes/googlesettings")
const menulisting=require("./routes/menulisting")
const infrastructure=require("./routes/infrastructure")
const qualitycontol=require("./routes/qualitycontrol")
const sitemap=require("./routes/sitemap")
const benefits=require("./routes/benefits")
const video = require("./routes/video")
const homeHero=require("./routes/HomeHero")
const homepage=require("./routes/homepage")
const herosection = require("./routes/heroSection")
const serviceDetails=require('./routes/serviceDetails')
const serviceImages = require('./routes/serviceImage')
const packages = require('./routes/plan')
const designProcess = require("./routes/designProcess")
const content = require("./routes/content")
// Middleware
const submenulisting = require("./routes/submenu")


// Increase body size limit for JSON requests
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the size limit as needed

// Increase body size limit for URL-encoded requests
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use(cookieParser());


  app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    exposedHeaders: ['x-filename'] 
}));

cron.schedule('59 23 31 * *', () => {
   
    exportAndBackupAllCollectionsmonthly();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" 
});




// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
  

// Static file serving
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Use routes
app.use('/api/product', productRoute);
app.use('/api/services', servicesRoute);
app.use('/api/news', newsRoute);
app.use('/api/pageHeading', pageHeadingRoute);
app.use('/api/image', imagesRoute);
app.use('/api/testimonial', testimonialRoute);
app.use('/api/faq', faq);
app.use('/api/staff', ourStaff);
app.use('/api/banner', banner);
app.use('/api/pageContent', pageContent);
app.use('/api/gallery', galleryImage);
app.use('/api/admin', adminRoutes);
app.use('/api/password',forgotPassword)
app.use('/api/email', emailRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/logo', logoRoutes);
app.use('/api/backup', BackupRoutes);
app.use('/api/aboutusPoints', AboutUsPoints);
app.use("/api/achievements",Achievements)
app.use("/api/counter",Counter)
app.use("/api/inquiries",inquiries)
app.use("/api/mission",mission)
app.use("/api/vision",vision)
app.use("/api/corevalue",corevalue)
app.use("/api/aboutcompany",aboutcompany)
app.use("/api/careeroption",careeroption)
app.use("/api/careerInquiries",careerinquiry)
app.use("/api/footer",footer)
app.use("/api/header",header)
app.use("/api/globalpresence",globalpresence)
app.use("/api/whatsappsettings",whatsappsettings)
app.use("/api/googlesettings",googlesettings)
app.use("/api/menulisting",menulisting)
app.use("/api/infrastructure",infrastructure)
app.use("/api/qualitycontrol",qualitycontol)
app.use("/api/sitemap",sitemap)
app.use("/api/benefits",benefits)
app.use('/api/herosection',herosection)
app.use('/api/serviceDetails',serviceDetails)
app.use("/api/homehero",homeHero)
app.use("/api/homepage",homepage)
app.use("/api/video",video)
app.use("/api/serviceImages",serviceImages)
app.use("/api/packages",packages)
app.use("/api/designProcess",designProcess)
app.use("/api/content",content)
app.use("/api/submenulisting",submenulisting)
// Start server
const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
