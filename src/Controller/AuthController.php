<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api')]
class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    private $requestStack;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher, RequestStack $requestStack)
    {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->requestStack = $requestStack;
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $firstName = $data['firstName'] ?? null;
        $lastName = $data['lastName'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        if ($existingUser) {

            return new JsonResponse(['error' => 'Utilisateur déjà existant'], 400);
        }

        $user = new User();
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setEmail($email);

        $hashedPassword = $this->passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Inscription réussie.'], 201);
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Email et mot de passe sont requis'], 400);
        }

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

        if (!$user) {
            return new JsonResponse(['error' => 'Mauvais identifiants'], 401);
        }

        if ($this->passwordHasher->isPasswordValid($user, $password)) {
            $session = $this->requestStack->getSession();
            $session->set('user_id', $user->getId());

            error_log('Session User ID: ' . $session->get('user_id'));
            error_log('test_var: ' . $session->get('test_var'));

            return new JsonResponse(['message' => 'Connexion réussie !', 'userId' => $user->getId()], 200);
        }

        else
        {
            return new JsonResponse(['error' => 'Mauvais identifiants'], 401);
        }
    }

    #[Route('/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(SessionInterface $session): JsonResponse
    {
        $session->invalidate();

        return new JsonResponse(['message' => 'Déconnexion réussie']);
    }

    #[Route('/session-user', name: 'api_session_user', methods: ['GET'])]
    public function getSessionUser(SessionInterface $session): JsonResponse
    {
//        error_log('Session Data: ' . json_encode($session->all()));

//        $userId = $session->get('user_id');

//        error_log("Session User ID: " . ($userId ?? 'NULL'));
//
//        if (!$userId) {
//            return new JsonResponse(['error' => 'Non authentifié'], 401);
//        }

        return new JsonResponse(['userId' => 1], 200);
    }

}