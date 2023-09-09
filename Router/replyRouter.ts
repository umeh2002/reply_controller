import { Router } from "express";
import {
  createReply,
  deleteReply,
  viewCommentReply,
  viewOneReply,
  viewReply,
} from "../Controller/replyController";

const router = Router();

router.route("/:userID/:commentID/create-reply").post(createReply);
router.route("/:userID/:commentID/view-reply").get(viewReply);
router.route("/:replyID/view-reply").get(viewOneReply);
router.route("/:commentID/view-comment-reply").get(viewCommentReply);
router.route("/:userID/:replyID/delete-reply").delete(deleteReply);

export default router;
