using iPractice.Api.Controllers.Psychologists.Dtos;
using iPractice.Api.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace iPractice.Api.UseCases.Psychologists;

public class GetPsychologistByNameQuery : IRequest<PsychologistSummaryDto?>
{
    public string Name { get; }

    public GetPsychologistByNameQuery(string name)
    {
        Name = name;
    }
}

public class GetPsychologistByNameHandler : IRequestHandler<GetPsychologistByNameQuery, PsychologistSummaryDto?>
{
    private readonly IPsychologistSqlRepository _psychologistRepository;

    public GetPsychologistByNameHandler(IPsychologistSqlRepository psychologistRepository)
    {
        _psychologistRepository = psychologistRepository;
    }

    public async Task<PsychologistSummaryDto?> Handle(GetPsychologistByNameQuery request, CancellationToken cancellationToken)
    {
        var psychologist = await _psychologistRepository.GetPsychologistByNameAsync(request.Name, cancellationToken);
        
        if (psychologist == null)
            return null;
            
        return new PsychologistSummaryDto(psychologist.Id, psychologist.Name);
    }
} 