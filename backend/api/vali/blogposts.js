const express = require("express");
const blogPostRoutes = express.Router();
const { Blogpost, Tag, Image } = require("../../db/valiDB");
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getObjectSignedUrl } = require("../../s3.js");

const { isValiLoggedIn, restrictValiAccess } = require("./middleware.js");

// get all the PUBLISHED blogposts
blogPostRoutes.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    let blogposts = await Blogpost.findAll({
      where: {
        published: true,
      },
      include: [Image, Tag],
      limit: limit,
      offset: (page - 1) * limit,
      order: [["publishedAt", "DESC"]],
    });

    let responseData = blogposts.map((blogpost) => blogpost.get({ plain: true }));
    // await Promise.all(
    //   responseData.map(async (blogpost) => {
    //     await Promise.all(
    //       blogpost.images.map(async (image) => {
    //         if (image.awsPicURL === null) {
    //           image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
    //         }
    //       })
    //     );
    //   })
    // );

    res.send(responseData);
  } catch (ex) {
    console.error("Error in /api/blogposts:", ex);

    next(ex);
  }
});

// get all the DRAFTED AND UNPUBLISHED blogposts
blogPostRoutes.get("/drafted", restrictValiAccess, async (req, res, next) => {
  try {
    let blogposts = await Blogpost.findAll({
      where: {
        published: false,
      },
      include: [Image, Tag],
    });

    let responseData = blogposts.map((blogpost) => blogpost.get({ plain: true }));

    await Promise.all(
      responseData.map(async (blogpost) => {
        await Promise.all(
          blogpost.images.map(async (image) => {
            if (image.awsPicURL === null) {
              image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
            }
          })
        );
      })
    );

    res.send(responseData);
  } catch (ex) {
    next(ex);
  }
});

// get a single blogpost
blogPostRoutes.get("/:id", async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findByPk(req.params.id, {
      include: [Image, Tag],
    });
    if (!blogpost) {
      return res.status(404).json({ message: "Blogpost not found" });
    }

    // await Promise.all(
    //   blogpost.images.map(async (image) => {
    //     try {
    //       if (image.awsPicURL === null) {
    //         image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching signed URL for image:", error);
    //     }
    //   })
    // );

    res.send(blogpost);
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

// add blogpost
blogPostRoutes.post("/", isValiLoggedIn, async (req, res, next) => {
  try {
    res.status(201).send(await Blogpost.create({ ...req.body, userId: req.user.id }));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

blogPostRoutes.put("/:id", isValiLoggedIn, async (req, res, next) => {
  try {
    let id = req.params.id;
    let request = req.body;
    const [update] = await Blogpost.update(
      {
        title: request.title,
        subtitle: request.subtitle,
        content: request.content,
        lastSaved: request.lastSaved,
      },
      {
        where: { id: id },
      }
    );
    res.status(200).send(await Blogpost.findByPk(id));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

blogPostRoutes.put("/publish/:id", isValiLoggedIn, restrictValiAccess, async (req, res, next) => {
  try {
    let today = new Date().toISOString();
    let id = req.params.id;
    const [update] = await Blogpost.update(
      {
        published: true,
        publishedAt: today,
        lastSaved: today,
      },
      {
        where: { id: id },
      }
    );

    const rssFeedXml = await generateRSSFeed();

    res.status(200).send(await Blogpost.findByPk(id));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

//this needs to somehow save the date that it was published.
blogPostRoutes.put("/hidden/:id", isValiLoggedIn, restrictValiAccess, async (req, res, next) => {
  try {
    let id = req.params.id;
    let today = new Date().toISOString();

    const [update] = await Blogpost.update(
      {
        published: false,
        archived: true,
        archivedOn: today,
      },
      {
        where: { id: id },
      }
    );
    res.status(200).send(await Blogpost.findByPk(id));
  } catch (ex) {
    res.status(404).send({ message: "No blogpost found with the given ID." });
    next(ex);
  }
});

// delete blogpost
blogPostRoutes.delete("/:id", isValiLoggedIn, async (req, res, next) => {
  try {
    const blogpost = await Blogpost.findByPk(req.params.id);
    await blogpost.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = blogPostRoutes;
