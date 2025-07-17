const frontendData = require("../dataModels/frontendDatas");
const trendingPackagesModel=require("../models/trending_packages")
const homePackagesModel=require("../models/home_Packages")
exports.getTrendingImages = async(req, res) => {
 try{ 
  const trendingData = await trendingPackagesModel.find();
  res.status(200).json(trendingData);
  }
  catch(error){
    res.status(500).json({message:"Error fetching Trending Packages from DB"})
  }
};

exports.getPackages = async(req, res) => {
 try {
    const packages = await homePackagesModel.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch packages from DB" });
  }
};
