const express = require("express");
const tagRoutes = express.Router();
const { Tag, Blogpost, Image } = require("../../db/valiDB");
const { getObjectSignedUrl } = require("../../s3.js");
const { isValiLoggedIn, isValiAdmin } = require("./middleware.js");

tagRoutes.get("/", async (req, res, next) => {
  try {
    res.send(await Tag.findAll());
  } catch (ex) {
    next(ex);
  }
});

//get all posts where a single tag is.
tagRoutes.get("/:id", async (req, res, next) => {
  const tagId = req.params.id;
  // console.log("trying tags with ID:", tagId);
  try {
    let response = await Blogpost.findAll({
      include: [
        {
          model: Tag,
          where: { id: tagId },
        },
        {
          model: Image,
        },
      ],
    });

    await Promise.all(
      response.map(async (blogpost) => {
        await Promise.all(
          blogpost.images.map(async (image) => {
            if (image.awsPicURL === null) {
              image.awsPicURL = await getObjectSignedUrl(image.awsPicID);
            }
          })
        );
      })
    );
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

tagRoutes.put("/:id", isValiLoggedIn, isValiAdmin, async (req, res, next) => {
  try {
    const post = await Blogpost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    const { firstTag, secondTag, thirdTag } = req.body;

    async function processTag(tag) {
      let cleanedTagName = tag.name.trim().toLowerCase();
      if (tag.id) {
        return tag.id;
      } else {
        const [newTag, created] = await Tag.findOrCreate({ where: { name: cleanedTagName } });
        return newTag.id;
      }
    }

    const tagIds = await Promise.all([processTag(firstTag), processTag(secondTag), processTag(thirdTag)]);

    await post.setTags(tagIds);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = tagRoutes;
