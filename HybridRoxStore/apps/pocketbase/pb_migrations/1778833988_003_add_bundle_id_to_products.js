/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const bundlesCollection = app.findCollectionByNameOrId("bundles");
  const collection = app.findCollectionByNameOrId("products");

  const existing = collection.fields.getByName("bundle_id");
  if (existing) {
    if (existing.type === "relation") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("bundle_id"); // exists with wrong type, remove first
  }

  collection.fields.add(new RelationField({
    name: "bundle_id",
    collectionId: bundlesCollection.id
  }));

  return app.save(collection);
}, (app) => {
  try {
    const collection = app.findCollectionByNameOrId("products");
    collection.fields.removeByName("bundle_id");
    return app.save(collection);
  } catch (e) {
    if (e.message.includes("no rows in result set")) {
      console.log("Collection not found, skipping revert");
      return;
    }
    throw e;
  }
})