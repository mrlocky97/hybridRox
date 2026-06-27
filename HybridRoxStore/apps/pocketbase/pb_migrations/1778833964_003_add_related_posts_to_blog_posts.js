/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const blog_postsCollection = app.findCollectionByNameOrId("blog_posts");
  const collection = app.findCollectionByNameOrId("blog_posts");

  const existing = collection.fields.getByName("related_posts");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("related_posts"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "related_posts",
    collectionId: blog_postsCollection.id,
    maxSelect: 999
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("blog_posts");
    collection.fields.removeByName("related_posts");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})