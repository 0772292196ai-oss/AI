// Service worker של "תוכנה בקליק".
// לא שומר עותקים של האתר – כל בקשה הולכת ישר לרשת, כך שתמיד רואים את הגרסה הכי חדשה.
// הוא קיים רק כדי שהדפדפן יאפשר "להתקין את האתר כאפליקציה".
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {}); // בלי respondWith – הדפדפן טוען כרגיל מהרשת
