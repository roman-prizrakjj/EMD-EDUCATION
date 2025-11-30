import { BookOpen, Code, Rocket, Users, Lightbulb, Target } from "lucide-react";

export const productsData = [
    {
        id: 1,
        title: "Рост через AI",
        date: "2024",
        content: "Программы по развитию AI-навыков от нуля до профессионального уровня.",
        category: "education",
        icon: BookOpen,
        status: "completed",
        energy: 95,
        // Продукты внутри раздела - можно называть и наполнять как угодно
        products: [
            {
                id: "1-1",
                title: "AI-старт: основы",
                content: "Базовый курс для тех, кто только начинает работать с AI. Научитесь эффективно использовать ChatGPT, Claude и другие инструменты.",
                details: {
                    duration: "4 недели",
                    format: "Онлайн",
                    level: "Начальный",
                    features: [
                        "Основы промпт-инжиниринга",
                        "Работа с ChatGPT и Claude",
                        "Практические задания",
                        "Сертификат"
                    ]
                }
            },
            {
                id: "1-2",
                title: "AI-профи: продвинутый",
                content: "Углублённый курс для специалистов. Сложные промпты, цепочки рассуждений, интеграция AI в рабочие процессы.",
                details: {
                    duration: "8 недель",
                    format: "Онлайн + Практика",
                    level: "Продвинутый",
                    features: [
                        "Сложные промпт-техники",
                        "Chain-of-thought",
                        "Автоматизация задач",
                        "Менторская поддержка"
                    ]
                }
            }
        ]
    },
    {
        id: 2,
        title: "AI-пайплайны",
        date: "2024",
        content: "Практические курсы по использованию AI-ассистентов в разработке.",
        category: "development",
        icon: Code,
        status: "in-progress",
        energy: 85,
        products: [
            {
                id: "2-1",
                title: "Cursor Mastery",
                content: "Полный курс по работе с Cursor — AI-редактором кода. От базовых команд до сложных рефакторингов.",
                details: {
                    duration: "3 недели",
                    format: "Воркшопы",
                    level: "Средний",
                    features: [
                        "Настройка Cursor",
                        "Эффективные промпты для кода",
                        "Рефакторинг с AI",
                        "Best practices"
                    ]
                }
            },
            {
                id: "2-2",
                title: "AI в CI/CD",
                content: "Интеграция AI-инструментов в pipeline разработки. Автоматизация код-ревью, тестов и документации.",
                details: {
                    duration: "2 недели",
                    format: "Практикум",
                    level: "Продвинутый",
                    features: [
                        "AI код-ревью",
                        "Автогенерация тестов",
                        "Документация с AI",
                        "GitHub Actions + AI"
                    ]
                }
            }
        ]
    },
    {
        id: 3,
        title: "AI-консалтинг",
        date: "2024",
        content: "Разработка и внедрение AI-стратегий для компаний любого масштаба.",
        category: "consulting",
        icon: Target,
        status: "completed",
        energy: 90,
        products: [
            {
                id: "3-1",
                title: "AI-аудит",
                content: "Комплексный анализ процессов компании и выявление точек для AI-оптимизации.",
                details: {
                    duration: "1-2 недели",
                    format: "Консалтинг",
                    level: "Для бизнеса",
                    features: [
                        "Аудит процессов",
                        "Карта возможностей",
                        "ROI-расчёт",
                        "Дорожная карта"
                    ]
                }
            },
            {
                id: "3-2",
                title: "AI-стратегия",
                content: "Разработка полной стратегии AI-трансформации с планом внедрения.",
                details: {
                    duration: "2-4 недели",
                    format: "Стратегическая сессия",
                    level: "C-level",
                    features: [
                        "Стратегия трансформации",
                        "План внедрения",
                        "Бюджетирование",
                        "KPI и метрики"
                    ]
                }
            }
        ]
    },
    {
        id: 4,
        title: "Корпоративное обучение",
        date: "2024",
        content: "Повышение квалификации специалистов и развитие AI-мышления в командах.",
        category: "corporate",
        icon: Users,
        status: "in-progress",
        energy: 80,
        products: [
            {
                id: "4-1",
                title: "AI для команд",
                content: "Интенсив для команд: как внедрить AI в ежедневную работу отдела.",
                details: {
                    duration: "3 дня",
                    format: "Интенсив",
                    level: "Любой",
                    features: [
                        "Командные воркшопы",
                        "Практика на реальных задачах",
                        "Чек-листы и шаблоны",
                        "Follow-up сессия"
                    ]
                }
            }
        ]
    },
    {
        id: 5,
        title: "Автоматизация",
        date: "2024",
        content: "Внедрение AI-решений для автоматизации отделов и оптимизации операций.",
        category: "automation",
        icon: Rocket,
        status: "completed",
        energy: 92,
        products: [
            {
                id: "5-1",
                title: "AI для маркетинга",
                content: "Автоматизация контент-маркетинга, аналитики и персонализации с помощью AI.",
                details: {
                    duration: "4 недели",
                    format: "Внедрение",
                    level: "Для маркетологов",
                    features: [
                        "Генерация контента",
                        "AI-аналитика",
                        "Персонализация",
                        "A/B тестирование"
                    ]
                }
            },
            {
                id: "5-2",
                title: "AI для HR",
                content: "Оптимизация рекрутинга, онбординга и HR-процессов с AI-инструментами.",
                details: {
                    duration: "3 недели",
                    format: "Внедрение",
                    level: "Для HR",
                    features: [
                        "Скрининг резюме",
                        "AI-интервью",
                        "Онбординг-боты",
                        "HR-аналитика"
                    ]
                }
            },
            {
                id: "5-3",
                title: "AI для поддержки",
                content: "Внедрение AI-ботов и автоматизация клиентского сервиса.",
                details: {
                    duration: "4 недели",
                    format: "Внедрение",
                    level: "Для саппорта",
                    features: [
                        "AI-чатботы",
                        "Автоответы",
                        "Классификация тикетов",
                        "База знаний с AI"
                    ]
                }
            }
        ]
    },
    {
        id: 6,
        title: "AI-разработка",
        date: "2024",
        content: "Создание кастомных AI-решений и продуктовых пайплайнов под ключ.",
        category: "innovation",
        icon: Lightbulb,
        status: "pending",
        energy: 75,
        products: [
            {
                id: "6-1",
                title: "AI MVP",
                content: "Быстрая разработка прототипа AI-продукта для валидации идеи.",
                details: {
                    duration: "2-4 недели",
                    format: "Разработка",
                    level: "Стартапы",
                    features: [
                        "Прототип за 2 недели",
                        "Интеграция LLM",
                        "Базовый UI",
                        "Документация"
                    ]
                }
            },
            {
                id: "6-2",
                title: "Enterprise AI",
                content: "Полноценная разработка AI-системы для крупного бизнеса.",
                details: {
                    duration: "2-6 месяцев",
                    format: "Разработка",
                    level: "Enterprise",
                    features: [
                        "Архитектура решения",
                        "Fine-tuning моделей",
                        "Интеграция с системами",
                        "Поддержка и масштабирование"
                    ]
                }
            }
        ]
    },
];
