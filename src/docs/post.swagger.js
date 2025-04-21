/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: 게시물 관련 API
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: 게시물 작성
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: 게시물 제목과 내용
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: 게시물 제목 예시
 *               content:
 *                 type: string
 *                 example: 게시물 내용 예시
 *     responses:
 *       201:
 *         description: 게시물이 작성되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: 전체 게시물 조회
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: 게시물 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: 특정 게시물 조회
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 조회할 게시물 ID
 *     responses:
 *       200:
 *         description: 게시물 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: 게시물이 존재하지 않음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   patch:
 *     summary: 게시물 수정
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 수정할 게시물 ID
 *     requestBody:
 *       description: 수정할 게시물 데이터 (title과/or content)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 수정된 제목
 *               content:
 *                 type: string
 *                 example: 수정된 내용
 *     responses:
 *       200:
 *         description: 게시물 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 postId:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       400:
 *         description: 수정할 내용이 없음
 *       403:
 *         description: 게시물 수정 권한 없음
 *       404:
 *         description: 게시물이 존재하지 않음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: 게시물 삭제
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 삭제할 게시물 ID
 *     responses:
 *       200:
 *         description: 게시물 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 postId:
 *                   type: integer
 *       403:
 *         description: 게시물 삭제 권한 없음
 *       404:
 *         description: 게시물이 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
