/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 회원 관련 API
 */

/**
 * @swagger
 * /api/sign-up:
 *   post:
 *     summary: 회원가입
 *     tags: [Users]
 *     requestBody:
 *       description: 회원가입 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *               - passwordCheck
 *               - nickName
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *               passwordCheck:
 *                 type: string
 *                 example: password123
 *               nickName:
 *                 type: string
 *                 example: 닉네임
 *     responses:
 *       201:
 *         description: 회원가입이 완료되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 nickName:
 *                   type: string
 *       409:
 *         description: 아이디 또는 닉네임 중복, 비밀번호 불일치
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/sign-in:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       description: 로그인 정보
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         headers:
 *           Authorization:
 *             description: Bearer 토큰
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 nickName:
 *                   type: string
 *       401:
 *         description: 아이디 없음 또는 비밀번호 틀림
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     summary: 회원정보 수정
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: 수정할 비밀번호와 닉네임
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: 현재비밀번호
 *               newPassword:
 *                 type: string
 *                 example: 새비밀번호
 *               newNickName:
 *                 type: string
 *                 example: 새닉네임
 *     responses:
 *       200:
 *         description: 회원정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: 비밀번호 틀림
 *       404:
 *         description: 사용자 없음
 *       409:
 *         description: 닉네임 중복 또는 동일 닉네임
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /api/users/me:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: 탈퇴를 위한 비밀번호 확인
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: 비밀번호
 *     responses:
 *       200:
 *         description: 계정 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: 비밀번호 틀림
 *       404:
 *         description: 사용자 없음
 *       500:
 *         description: 서버 오류
 */
