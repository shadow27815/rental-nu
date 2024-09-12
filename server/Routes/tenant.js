const express = require('express');
const router = express.Router();
const { create, list, read, update, remove, updateStatus } = require('../Controllers/tenantController');
const { uploadGeneral } = require('../Middleware/upload');

// เส้นทางที่เกี่ยวข้องกับการอัปโหลดไฟล์
router.post('/tenant', uploadGeneral.single('slip'), create);
router.put('/tenant/:id', uploadGeneral.single('slip'), update);


router.get('/tenants', list);
router.get('/tenant/:id', read);
router.delete('/tenant/:id', remove);
router.put('/tenant/:id/status', updateStatus);

module.exports = router;
