/**
 * @swagger
 * /api/sign-up:
 *   post:
 *     summary: 회원가입
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordCheck:
 *                 type: string
 *               nickName:
 *                 type: string
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       409:
 *         description: 중복된 아이디 또는 닉네임
 */

/**
 * @swagger
 * /api/sign-in:
 *   post:
 *     summary: 로그인
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 로그인 실패
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   patch:
 *     summary: 회원정보 수정
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 유저 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               newNickName:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 사용자 없음
 *       409:
 *         description: 중복된 닉네임
 */

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: 회원탈퇴
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 계정 삭제 성공
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 사용자 없음
 */
