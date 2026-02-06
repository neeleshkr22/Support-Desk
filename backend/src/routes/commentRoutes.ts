import { Router } from 'express';
import { getComments, createComment } from '../controllers/commentController';

const router = Router();

router.get('/:id/comments', getComments);
router.post('/:id/comments', createComment);

export default router;
