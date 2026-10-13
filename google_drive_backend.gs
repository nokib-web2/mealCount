/**
 * =========================================================================
 * MEAL TRACKER PRO - GOOGLE DRIVE DATABASE BACKEND
 * =========================================================================
 * 
 * This Google Apps Script turns your Google Drive into a 100% free, private,
 * and reliable database for Meal Tracker Pro.
 * 
 * IMPORTANT: WHEN DEPLOYING:
 * 1. Click "Deploy" -> "New deployment"
 * 2. Select type: "Web app"
 * 3. Execute as: "Me"
 * 4. Who has access: "Anyone"  <--- MUST BE "Anyone" (Not "Only myself")
 * =========================================================================
 */

const DB_FILE_NAME = "meal_tracker_db.json";

/**
 * Get or create the database JSON file in your Google Drive root folder.
 */
function getOrCreateDbFile() {
  const files = DriveApp.getFilesByName(DB_FILE_NAME);
  if (files.hasNext()) {
    return files.next();
  }
  
  // Initial empty template if file doesn't exist yet
  const initialData = {
    settings: {
      appName: "Meal Tracker Pro",
      currency: "৳",
      adminPin: "@nokib"
    },
    members: [],
    meals: {},
    costs: [],
    logs: [
      {
        user: "System",
        time: new Date().toLocaleString(),
        action: "Database initialized in Google Drive"
      }
    ]
  };
  
  return DriveApp.createFile(DB_FILE_NAME, JSON.stringify(initialData, null, 2), MimeType.PLAIN_TEXT);
}

/**
 * Handle HTTP GET requests
 * Supports both standard JSON and JSONP (callback) to work even from file:/// URLs!
 */
function doGet(e) {
  const callback = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : null;
  const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "read";
  
  try {
    if (action === "ping") {
      return createOutput({ status: "ok", message: "Google Drive Backend is online!" }, callback);
    }
    
    // Support saving via GET (useful if browser blocks POST from file://)
    if (action === "write" && e.parameter.payload) {
      const file = getOrCreateDbFile();
      const content = e.parameter.payload;
      JSON.parse(content); // validate JSON
      file.setContent(content);
      return createOutput({ status: "success", timestamp: new Date().toISOString() }, callback);
    }
    
    // Default: Read DB
    const file = getOrCreateDbFile();
    const content = file.getBlob().getDataAsString();
    const parsed = JSON.parse(content);
    return createOutput({ status: "success", data: parsed, lastUpdated: file.getLastUpdated() }, callback);
  } catch (err) {
    return createOutput({ status: "error", message: err.toString() }, callback);
  }
}

/**
 * Handle HTTP POST requests (Standard save)
 */
function doPost(e) {
  try {
    let postData = "";
    if (e && e.postData && e.postData.contents) {
      postData = e.postData.contents;
    } else if (e && e.parameter && e.parameter.data) {
      postData = e.parameter.data;
    } else {
      throw new Error("No data received in POST body");
    }
    
    // Validate JSON structure
    const parsed = JSON.parse(postData);
    
    const file = getOrCreateDbFile();
    file.setContent(JSON.stringify(parsed, null, 2));
    
    return createOutput({
      status: "success",
      message: "Data saved successfully to Google Drive",
      timestamp: new Date().toISOString()
    }, null);
  } catch (err) {
    return createOutput({ status: "error", message: err.toString() }, null);
  }
}

/**
 * Helper to build JSON or JSONP response with CORS allowance
 */
function createOutput(obj, callback) {
  const jsonString = JSON.stringify(obj);
  
  if (callback) {
    // Return JSONP for 100% CORS-free support across all origins including file:///
    return ContentService.createTextOutput(callback + "(" + jsonString + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  return ContentService.createTextOutput(jsonString)
    .setMimeType(ContentService.MimeType.JSON);
}
