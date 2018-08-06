using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetcore.Data;
using dotnetcore.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;

namespace dotnetcore
{
    internal sealed class Startup
    {
        private readonly IConfiguration _configuration;
        private const string _corsPolicy = "CorsPolicy";

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection
                .AddSingleton<IDocumentDbConnection, DocumentDbConnection>()
                .AddSingleton<IDocumentDbRepository, DocumentDbRepository>()
                .AddSingleton<IHeroRepository, HeroRepository>()
                .AddSingleton<IHeroService, HeroService>()
                .AddMvcCore()
                .AddJsonFormatters()
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver());

            serviceCollection
                .AddCors(options =>
                {
                    options.AddPolicy(_corsPolicy, builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials();
                    });
                });
        }

        public void Configure(IApplicationBuilder applicationBuilder, IHostingEnvironment hostingEnvironment)
        {
            if (hostingEnvironment.IsDevelopment())
                applicationBuilder.UseDeveloperExceptionPage();

            applicationBuilder.UseCors(_corsPolicy);
            applicationBuilder.UseMvcWithDefaultRoute();
        }
    }
}
